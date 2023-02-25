import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  save: (surveyId: string) => Promise<SurveyResultModel>
}
