import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<LoadSurveyResult.Output>
}

export namespace LoadSurveyResult {
  export type Output = SurveyResultModel
}
