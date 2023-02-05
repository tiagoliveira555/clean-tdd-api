import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MissingParamsError } from '@/presentation/errrors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const requiredFields = ['name', 'email', 'password']
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
