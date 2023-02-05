import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols'
import { InvalidParamError, MissingParamsError } from '@/presentation/errrors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
    const isValid = this.emailValidator.isValid(body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
