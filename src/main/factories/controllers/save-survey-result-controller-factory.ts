import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbSaveSurveyResult, makeDbLoadAnswersBySurvey } from '@/main/factories/usecases'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
