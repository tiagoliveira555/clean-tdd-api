import { Controller, Output } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { LoadSurveys } from '@/domain/usecases'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (input: LoadSurveysController.Input): Promise<Output> {
    try {
      const surveys = await this.loadSurveys.load(input.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveysController {
  export type Input = {
    accountId: string
  }
}
