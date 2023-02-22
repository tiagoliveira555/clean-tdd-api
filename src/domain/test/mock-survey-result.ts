import { SurveyResultModel } from '../models'
import { SaveSurveyResultParams } from '../usecases/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_surveyId',
  accountId: 'any_accountId',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  ...mockSaveSurveyResultParams(),
  id: 'any_id'
})
