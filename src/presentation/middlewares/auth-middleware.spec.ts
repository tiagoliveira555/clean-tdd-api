import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '@/presentation/helpers/http'
import { AccessDeniedError } from '@/presentation/errors'

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
