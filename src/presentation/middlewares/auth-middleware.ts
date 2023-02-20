import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers/http'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
