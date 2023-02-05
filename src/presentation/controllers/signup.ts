import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MissingParamsError } from '@/presentation/errrors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'))
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
