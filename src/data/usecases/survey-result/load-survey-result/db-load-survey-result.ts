import { LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRespository
  ) {}

  async load (surveyId: string, accoundId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accoundId)
    return surveyResult
  }
}
