import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db/account'

import { faker } from '@faker-js/faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  input: AddAccountRepository.Input
  result = true

  async add (input: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    this.input = input
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Output> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  input: LoadAccountByTokenRepository.Input
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (input: LoadAccountByTokenRepository.Input): Promise<LoadAccountByTokenRepository.Output> {
    this.input = input
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    await Promise.resolve()
  }
}
