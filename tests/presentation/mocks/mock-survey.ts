import { AddSurvey, LoadSurveyById, LoadSurveys } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveysModel } from '@/tests/domain/mocks'

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

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}
