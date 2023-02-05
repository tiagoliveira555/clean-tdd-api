import { HttpRequest, HttpResponse, Controller } from '@/presentation/protocols'
import { MissingParamsError } from '@/presentation/errrors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
