import { SaveSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { LoadSurveyByIdSpy, SaveSurveyResultSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'
import MockDate from 'mockdate'

const mockInput = (answer: string = null): SaveSurveyResultController.Input => ({
  surveyId: faker.datatype.uuid(),
  answer,
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadSurveyByIdSpy, saveSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
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

  it('should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(loadSurveyByIdSpy.id).toBe(input.surveyId)
  })

  it('should return 403 LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
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
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const input = mockInput(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    await sut.handle(input)
    expect(saveSurveyResultSpy.data).toEqual({
      surveyId: input.surveyId,
      accountId: input.accountId,
      answer: input.answer,
      date: new Date()
    })
  })

  it('should return 500 SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new Error())
    const input = mockInput(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const output = await sut.handle(input)
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const input = mockInput(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const output = await sut.handle(input)
    expect(output).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
