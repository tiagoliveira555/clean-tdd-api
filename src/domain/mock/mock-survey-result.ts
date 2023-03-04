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
  question: faker.random.words(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }],
  date: faker.date.recent()
})
