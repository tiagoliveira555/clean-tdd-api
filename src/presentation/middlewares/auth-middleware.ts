import { Output, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (input: AuthMiddleware.Input): Promise<Output> {
    try {
      const { accessToken } = input
      if (accessToken) {
        const account = await this.loadAccountByToken.load({ accessToken, role: this.role })
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Input = {
    accessToken?: string
  }
}
