import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRespository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<LoadSurveyResultRespository.Output>
}

export namespace LoadSurveyResultRespository {
  export type Output = SurveyResultModel
}
