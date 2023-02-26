import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey'
import { LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRespository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accoundId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accoundId)
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return surveyResult
  }
}
