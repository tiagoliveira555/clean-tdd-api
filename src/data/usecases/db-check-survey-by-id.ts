import { CheckSurveyByIdRepository } from '@/data/protocols/db/survey'
import { CheckSurveyById } from '@/domain/usecases'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckSurveyById.Output> {
    return await this.checkSurveyByIdRepository.checkById(id)
  }
}
