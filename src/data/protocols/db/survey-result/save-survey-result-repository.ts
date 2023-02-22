import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result'

export interface SaveSurveyResultRespository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
