import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
