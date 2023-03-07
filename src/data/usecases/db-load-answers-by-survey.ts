import { LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey'
import { LoadAnswersBySurvey } from '@/domain/usecases'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (
    private readonly loadAnswersBySurveyRespository: LoadAnswersBySurveyRepository
  ) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Output> {
    return await this.loadAnswersBySurveyRespository.loadAnswers(id)
  }
}
