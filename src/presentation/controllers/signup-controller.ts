import { Output, Controller, Validation } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AddAccount, Authentication } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (input: SignUpController.Input): Promise<Output> {
    try {
      const error = this.validation.validate(input)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = input
      const isValid = await this.addAccount.add({ name, email, password })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({ email, password })
      return ok(authenticationModel)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Input = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
