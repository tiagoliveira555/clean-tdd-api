import { Decrypter } from '@/data/protocols/criptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load ({ accessToken, role }: LoadAccountByToken.Input): Promise<LoadAccountByToken.Output> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken({ accessToken, role })
      if (account) {
        return account
      }
    }
    return null
  }
}
