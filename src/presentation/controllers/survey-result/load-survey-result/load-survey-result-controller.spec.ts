import { LoadSurveyResultController } from './load-survey-result-controller'
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test'
import { HttpRequest } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http'
import { LoadSurveyResult } from '@/domain/usecases/survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  },
  accountId: 'any_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyResultStub: LoadSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
  return {
    sut,
    loadSurveyResultStub,
    loadSurveyByIdStub
  }
}

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
