import { LoadSurveysController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { LoadSurveysSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

const mockInput = (): LoadSurveysController.Input => ({
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  it('should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(loadSurveysSpy.accountId).toBe(input.accountId)
    expect(loadSurveysSpy.countCalls).toBe(1)
  })

  it('should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const output = await sut.handle(mockInput())
    expect(output).toEqual(ok(loadSurveysSpy.surveyModel))
  })

  it('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModel = []
    const output = await sut.handle(mockInput())
    expect(output).toEqual(noContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })
})
