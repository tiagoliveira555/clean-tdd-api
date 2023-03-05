import { Encrypter } from '@/data/protocols/criptography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (input: AddAccount.Input): Promise<AddAccount.Output> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(input.email)
    let isValid = false
    if (!account) {
      const hashedPassword = await this.encrypter.encrypt(input.password)
      isValid = await this.addAccountRepository.add({ ...input, password: hashedPassword })
    }
    return isValid
  }
}
