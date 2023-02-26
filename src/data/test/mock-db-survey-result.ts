import { SaveSurveyResultRespository, LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRespository => {
  class SaveSurveyResultRespositoryStub implements SaveSurveyResultRespository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveSurveyResultRespositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRespository => {
  class LoadSurveyResultRespositoryStub implements LoadSurveyResultRespository {
    async loadBySurveyId (suveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRespositoryStub()
}
