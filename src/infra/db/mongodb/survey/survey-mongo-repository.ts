import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { AddSurveyRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { AddSurveyModel } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveysDataMongo = await surveyCollection.find().toArray()
    MongoHelper.map(surveysDataMongo)
    const surveys = surveysDataMongo.map(survey => ({
      id: survey._id.toHexString(),
      question: survey.question,
      answers: survey.answers,
      date: survey.date
    }))
    return surveys
  }
}
