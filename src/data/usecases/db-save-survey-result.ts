import { LoadSurveyResultRespository, SaveSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SaveSurveyResult } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRespository: SaveSurveyResultRespository,
    private readonly loadSurveyResultRespository: LoadSurveyResultRespository
  ) {}

  async save (input: SaveSurveyResult.Input): Promise<SaveSurveyResult.Output> {
    await this.saveSurveyResultRespository.save(input)
    return await this.loadSurveyResultRespository.loadBySurveyId(input.surveyId, input.accountId)
  }
}
