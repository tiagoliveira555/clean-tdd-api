import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { Controller, Output } from '@/presentation/protocols'
import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (input: LoadSurveyResultController.Input): Promise<Output> {
    try {
      const { surveyId, accountId } = input
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Input = {
    surveyId: string
    accountId: string
  }
}
