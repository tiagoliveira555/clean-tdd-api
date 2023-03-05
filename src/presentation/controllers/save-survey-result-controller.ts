import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { Controller, Output } from '@/presentation/protocols'
import { SaveSurveyResult, LoadSurveyById } from '@/domain/usecases'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (input: SaveSurveyResultController.Input): Promise<Output> {
    try {
      const { surveyId, accountId, answer } = input
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Input = {
    surveyId: string
    accountId: string
    answer: string
  }
}
