import { AddSurvey, CheckSurveyById, LoadAnswersBySurvey, LoadSurveys } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveysModel } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

export class AddSurveySpy implements AddSurvey {
  input: AddSurvey.Input

  async add (input: AddSurvey.Input): Promise<void> {
    this.input = input
    await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModel = mockSurveysModel()
  accountId: string
  countCalls = 0

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    this.countCalls++
    return await Promise.resolve(this.surveyModel)
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  id: string
  result = [faker.random.word(), faker.random.word()]

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Output> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Output> {
    this.id = id
    return this.result
  }
}
