import { AddSurveyRepository } from '@/data/protocols/db/survey'
import { AddSurvey } from '@/domain/usecases'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (input: AddSurvey.Input): Promise<void> {
    await this.addSurveyRepository.add(input)
  }
}
