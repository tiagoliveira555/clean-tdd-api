import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { mockaveSurveyResultRepository } from '@/data/test'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRespositoryStub: SaveSurveyResultRespository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRespositoryStub = mockaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRespositoryStub)
  return {
    sut,
    saveSurveyResultRespositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRespositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRespositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toBeCalledWith(surveyResultData)
  })

  it('should throws SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRespositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRespositoryStub, 'save').mockRejectedValueOnce(new Error())
    const surveyResultData = mockSaveSurveyResultParams()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  it('should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    const surveyResult = await sut.save(surveyResultData)
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
