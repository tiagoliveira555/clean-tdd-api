import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  input: SaveSurveyResult.Input
  result = mockSurveyResultModel()

  async save (input: SaveSurveyResult.Input): Promise<SaveSurveyResult.Output> {
    this.input = input
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}
