import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveysModel } from '@/tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  input: AddSurveyRepository.Input

  async add (input: AddSurveyRepository.Input): Promise<void> {
    this.input = input
    await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
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
