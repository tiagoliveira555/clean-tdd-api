import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
