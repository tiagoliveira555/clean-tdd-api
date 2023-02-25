import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRespository {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
