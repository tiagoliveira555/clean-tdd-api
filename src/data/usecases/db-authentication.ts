import { Encrypter, HashCompare } from '@/data/protocols/criptography'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db/account'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (input: Authentication.Input): Promise<Authentication.Output> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(input.email)
    if (account) {
      const isValid = await this.hashCompare.compare(input.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name
        }
      }
    }
    return null
  }
}
