import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'

import MockDate from 'mockdate'

const makeSaveSurveyResultRepository = (): SaveSurveyResultRespository => {
  class SaveSurveyResultRespositoryStub implements SaveSurveyResultRespository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
    }
  }
  return new SaveSurveyResultRespositoryStub()
}

const makeFakeSaveSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_surveyId',
  accountId: 'any_accountId',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel =>
  Object.assign({ ...makeFakeSaveSurveyResultData(), id: 'any_id' })

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRespositoryStub: SaveSurveyResultRespository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRespositoryStub = makeSaveSurveyResultRepository()
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
    const surveyResultData = makeFakeSaveSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toBeCalledWith(surveyResultData)
  })

  it('should throws SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRespositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRespositoryStub, 'save').mockRejectedValueOnce(new Error())
    const surveyResultData = makeFakeSaveSurveyResultData()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  it('should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = makeFakeSaveSurveyResultData()
    const surveyResult = await sut.save(surveyResultData)
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
