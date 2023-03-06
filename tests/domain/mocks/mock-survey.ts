import { SurveyModel } from '@/domain/models'

import { faker } from '@faker-js/faker'
import { AddSurvey } from '../usecases'

export const mockAddSurveyParams = (): AddSurvey.Input => ({
  question: faker.random.word(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})

export const mockSurveyModel = (): SurveyModel => ({
  ...mockAddSurveyParams(),
  id: faker.datatype.uuid()
})

export const mockSurveysModel = (): SurveyModel[] => {
  return [mockSurveyModel(), mockSurveyModel()]
}
