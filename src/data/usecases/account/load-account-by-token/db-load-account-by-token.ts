import { Decrypter } from '@/data/protocols/criptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account'
import { AccountModel } from '@/domain/models'
import { LoadAccountByToken, LoadAccountByTokenParams } from '@/domain/usecases/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load ({ accessToken, role }: LoadAccountByTokenParams): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
