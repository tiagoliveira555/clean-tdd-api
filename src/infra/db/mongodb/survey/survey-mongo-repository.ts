import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { AddSurveyModel } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveysDataMongo = await surveyCollection.find().toArray()
    const surveys = surveysDataMongo.map(survey => ({
      id: survey._id.toHexString(),
      question: survey.question,
      answers: survey.answers,
      date: survey.date
    }))
    return surveys
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne(new ObjectId(id))
    return MongoHelper.map(survey)
  }
}
