import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultStub()
}
