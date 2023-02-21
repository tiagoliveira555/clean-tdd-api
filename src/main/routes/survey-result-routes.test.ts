import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import request from 'supertest'

describe('SurveyResult Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({ answers: 'any_answer' })
        .expect(403)
    })
  })
})
