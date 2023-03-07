import { SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (input: SaveSurveyResult.Input) => Promise<SaveSurveyResult.Output>
}

export namespace SaveSurveyResult {
  export type Input = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }

  export type Output = SurveyResultModel
}
