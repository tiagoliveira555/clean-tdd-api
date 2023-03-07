import { SaveSurveyResultRespository, LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultRespositorySpy implements SaveSurveyResultRespository {
  input: SaveSurveyResultRespository.Input

  async save (input: SaveSurveyResultRespository.Input): Promise<void> {
    this.input = input
    await Promise.resolve()
  }
}

export class LoadSurveyResultRespositorySpy implements LoadSurveyResultRespository {
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async loadBySurveyId (suveyId: string, accountId: string): Promise<LoadSurveyResultRespository.Output> {
    this.surveyId = suveyId
    this.accountId = accountId
    return this.result
  }
}
