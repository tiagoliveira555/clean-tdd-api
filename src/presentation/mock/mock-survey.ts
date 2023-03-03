import { AddSurvey, AddSurveyParams, LoadSurveyById, LoadSurveys } from '@/domain/usecases/survey'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveysModel } from '@/domain/mock'

export class AddSurveySpy implements AddSurvey {
  data: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.data = data
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
