import { SaveSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { LoadAnswersBySurveySpy, SaveSurveyResultSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'
import MockDate from 'mockdate'

const mockInput = (answer: string = null): SaveSurveyResultController.Input => ({
  surveyId: faker.datatype.uuid(),
  answer,
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveySpy: LoadAnswersBySurveySpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadAnswersBySurveySpy, saveSurveyResultSpy)
  return {
    sut,
    loadAnswersBySurveySpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadAnswersBySurvey with correct id', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(loadAnswersBySurveySpy.id).toBe(input.surveyId)
  })

  it('should return 403 LoadAnswersBySurvey returns null', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    loadAnswersBySurveySpy.result = []
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const input = mockInput()
    const output = await sut.handle({
      surveyId: input.surveyId,
      answer: faker.random.word(),
      accountId: input.accountId
    })
    expect(output).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const input = mockInput(loadAnswersBySurveySpy.result[0])
    await sut.handle(input)
    expect(saveSurveyResultSpy.data).toEqual({
      surveyId: input.surveyId,
      accountId: input.accountId,
      answer: input.answer,
      date: new Date()
    })
  })

  it('should return 500 SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new Error())
    const input = mockInput(loadAnswersBySurveySpy.result[0])
    const output = await sut.handle(input)
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const input = mockInput(loadAnswersBySurveySpy.result[0])
    const output = await sut.handle(input)
    expect(output).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
