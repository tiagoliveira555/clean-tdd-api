import { SaveSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '@/domain/test'

export const mockaveSurveyResultRepository = (): SaveSurveyResultRespository => {
  class SaveSurveyResultRespositoryStub implements SaveSurveyResultRespository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultRespositoryStub()
}
