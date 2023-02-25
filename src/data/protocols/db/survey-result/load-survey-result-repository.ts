import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRespository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
