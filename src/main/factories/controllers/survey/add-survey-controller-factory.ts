import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddSurvey } from '@/main/factories/usecases/add-survey'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
