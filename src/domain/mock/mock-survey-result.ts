import { faker } from '@faker-js/faker'
import { SurveyResultModel } from '../models'
import { SaveSurveyResultParams } from '../usecases/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.word(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: 0,
    percent: 0
  }, {
    answer: faker.random.word(),
    count: 0,
    percent: 0
  }, {
    answer: faker.random.word(),
    count: 0,
    percent: 0
  }],
  date: faker.date.recent()
})
