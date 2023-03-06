import { Encrypter } from '@/data/protocols/criptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db/account'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (input: AddAccount.Input): Promise<AddAccount.Output> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(input.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.encrypter.encrypt(input.password)
      isValid = await this.addAccountRepository.add({ ...input, password: hashedPassword })
    }
    return isValid
  }
}
