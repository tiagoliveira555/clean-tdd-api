import { AddSurveyRepository, CheckSurveyByIdRepository, LoadAnswersBySurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveysModel } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  input: AddSurveyRepository.Input

  async add (input: AddSurveyRepository.Input): Promise<void> {
    this.input = input
    await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  result = mockSurveyModel()

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Output> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  id: string
  result = [faker.random.word(), faker.random.word()]

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Output> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Output> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveysModel = mockSurveysModel()
  accountId: string
  callsCount = 0

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    this.callsCount++
    return await Promise.resolve(this.surveysModel)
  }
}
