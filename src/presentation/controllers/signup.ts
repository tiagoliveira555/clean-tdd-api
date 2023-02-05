import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MissingParamsError } from '@/presentation/errrors'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsError('email')
      }
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
