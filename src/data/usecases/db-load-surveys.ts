import { LoadSurveysRepository } from '@/data/protocols/db/survey'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (accountId: string): Promise<LoadSurveys.Output> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
