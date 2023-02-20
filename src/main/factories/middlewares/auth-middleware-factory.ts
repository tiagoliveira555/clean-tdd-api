import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
