import { LoadSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { LoadSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

const mockInput = (): LoadSurveyResultController.Input => ({
  surveyId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyResultSpy: LoadSurveyResultSpy
  loadSurveyByIdSpy: LoadSurveyByIdSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    loadSurveyResultSpy,
    loadSurveyByIdSpy
  }
}

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(loadSurveyByIdSpy.id).toBe(input.surveyId)
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
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
    expect(output).toEqual(ok(loadSurveyResultSpy.surveyResultModel))
  })
})
