import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultModel } from '@/domain/usecases'

export interface SaveSurveyResultRespository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
