import { LoadSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

const mockInput = (): LoadSurveyResultController.Input => ({
  surveyId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyResultSpy: LoadSurveyResultSpy
  checkSurveyByIdSpy: CheckSurveyByIdSpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    loadSurveyResultSpy,
    checkSurveyByIdSpy
  }
}

describe('LoadSurveyResult Controller', () => {
  it('should call CheckSurveyById with correct id', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(checkSurveyByIdSpy.id).toBe(input.surveyId)
  })

  it('should return 403 if CheckSurveyById returns false', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    checkSurveyByIdSpy.result = false
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })

  it('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(loadSurveyResultSpy.surveyId).toBe(input.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(input.accountId)
  })

  it('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const output = await sut.handle(mockInput())
    expect(output).toEqual(ok(loadSurveyResultSpy.result))
  })
})
