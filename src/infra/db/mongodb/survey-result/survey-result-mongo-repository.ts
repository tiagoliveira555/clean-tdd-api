import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { SaveSurveyResultRespository } from '@/data/protocols/db/survey'
import { SaveSurveyResultModel } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

export class SurveyResultMongoRepository implements SaveSurveyResultRespository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = MongoHelper.getCollection('surveys')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accoundId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return res.value && MongoHelper.map(res.value)
  }
}
