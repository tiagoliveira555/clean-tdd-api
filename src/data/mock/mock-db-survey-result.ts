import { SaveSurveyResultRespository, LoadSurveyResultRespository } from '@/data/protocols/db/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '@/domain/mock'

export class SaveSurveyResultRespositorySpy implements SaveSurveyResultRespository {
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data
    await Promise.resolve()
  }
}

export class LoadSurveyResultRespositorySpy implements LoadSurveyResultRespository {
  surveyId: string
  accountId: string
  surveyResultModel = mockSurveyResultModel()

  async loadBySurveyId (suveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = suveyId
    this.accountId = accountId
    return await Promise.resolve(this.surveyResultModel)
  }
}
