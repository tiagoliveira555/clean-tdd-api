import { LoadSurveyResultRespository, SaveSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRespository: SaveSurveyResultRespository,
    private readonly loadSurveyResultRespository: LoadSurveyResultRespository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRespository.save(data)
    return await this.loadSurveyResultRespository.loadBySurveyId(data.surveyId, data.accountId)
  }
}
