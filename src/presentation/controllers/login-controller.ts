import { Controller, Output, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (input: LoginController.Input): Promise<Output> {
    try {
      const error = this.validation.validate(input)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = input
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Input = {
    email: string
    password: string
  }
}
