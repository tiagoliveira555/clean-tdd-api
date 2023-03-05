import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, Output, Validation } from '@/presentation/protocols'
import { AddSurvey } from '@/domain/usecases'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (input: AddSurveyController.Input): Promise<Output> {
    try {
      const error = this.validation.validate(input)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = input
      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddSurveyController {
  export type Input = {
    question: string
    answers: Answer[]
  }

  type Answer = {
    image?: string
    answer: string
  }
}
