import { AddSurveyParams } from '@/domain/usecases/survey'
import { SurveyModel } from '../models'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer_1'
  }, {
    answer: 'any_answer_2'
  }, {
    answer: 'any_answer_3'
  }],
  date: new Date()
})

export const mockSurveyModel = (): SurveyModel => ({
  ...mockAddSurveyParams(),
  id: 'any_id'
})

export const mockSurveysModel = (): SurveyModel[] => {
  return [mockSurveyModel(), mockSurveyModel()]
}
