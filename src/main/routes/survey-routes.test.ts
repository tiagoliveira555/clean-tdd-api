import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    it('should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Tiago',
        email: 'tiago2@gmail.com',
        password: '123',
        role: 'admin'
      })
      const account = await accountCollection.findOne(res.insertedId)
      const accessToken = sign({ id: account._id.toHexString() }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: account._id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    it('should return 204 on load surveys is empty with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Tiago',
        email: 'tiago2@gmail.com',
        password: '123'
      })
      const account = await accountCollection.findOne(res.insertedId)
      const accessToken = sign({ id: account._id.toHexString() }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: account._id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    it('should return 200 on load surveys with valid accessToken', async () => {
      await surveyCollection.insertMany([{
        question: 'Question',
        answers: [{
          image: 'http://name-image',
          answer: 'Answer'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      }])
      const res = await accountCollection.insertOne({
        name: 'Tiago',
        email: 'tiago2@gmail.com',
        password: '123'
      })
      const account = await accountCollection.findOne(res.insertedId)
      const accessToken = sign({ id: account._id.toHexString() }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: account._id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
