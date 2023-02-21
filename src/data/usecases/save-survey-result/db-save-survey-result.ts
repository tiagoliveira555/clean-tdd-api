import { SaveSurveyResultRespository } from '@/data/protocols/db/survey'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRespository: SaveSurveyResultRespository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRespository.save(data)
    return null
  }
}
