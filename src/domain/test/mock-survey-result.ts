import { SurveyResultModel } from '../models'
import { SaveSurveyResultParams } from '../usecases/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer_1',
    count: 0,
    percent: 0
  }, {
    answer: 'any_answer_2',
    count: 0,
    percent: 0
  }, {
    answer: 'any_answer_3',
    count: 0,
    percent: 0
  }],
  date: new Date()
})
