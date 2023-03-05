import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbSaveSurveyResult, makeDbLoadSurveyById } from '@/main/factories/usecases'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
