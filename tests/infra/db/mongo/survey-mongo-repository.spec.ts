import { MongoHelper, SurveyMongoRepository } from '@/infra/db/mongodb'
import { mockAccountInput, mockAddSurveyParams } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAccountInput())
  return res.insertedId.toHexString()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    it('should loadAll surveys on success', async () => {
      const accountId = await makeAccountId()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const res = await surveyCollection.insertMany(addSurveyModels)
      const survey = await surveyCollection.findOne(res.insertedIds[0])
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    it('should load empty list', async () => {
      const accountId = await makeAccountId()
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('should loadById surveyResult on success', async () => {
      const res = await surveyCollection.insertOne(mockAddSurveyParams())
      const sut = makeSut()
      const surveyResult = await sut.loadById(res.insertedId.toHexString())
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
    })
  })
})
