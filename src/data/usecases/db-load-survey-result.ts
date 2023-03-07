import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey'
import { LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { LoadSurveyResult } from '@/domain/usecases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRespository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accoundId: string): Promise<LoadSurveyResult.Output> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accoundId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId,
        question: survey.question,
        answers: survey.answers.map(answer => ({ ...answer, count: 0, percent: 0, isCurrentAccountAnswer: false })),
        date: survey.date
      }
    }
    return surveyResult
  }
}
