import { MissingParamsError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamsError('email'))
    }
    if (!password) {
      return badRequest(new MissingParamsError('password'))
    }
    this.emailValidator.isValid(email)
  }
}
