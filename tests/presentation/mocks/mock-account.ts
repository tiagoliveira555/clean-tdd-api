import { Authentication, AddAccount, LoadAccountByToken } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  input: AddAccount.Input
  result = true

  async add (input: AddAccount.Input): Promise<AddAccount.Output> {
    this.input = input
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  input: Authentication.Input
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
  }

  async auth (input: Authentication.Input): Promise<Authentication.Output> {
    this.input = input
    return await Promise.resolve(this.result)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  input: LoadAccountByToken.Input
  result = {
    id: faker.datatype.uuid()
  }

  async load (input: LoadAccountByToken.Input): Promise<LoadAccountByToken.Output> {
    this.input = input
    return await Promise.resolve(this.result)
  }
}
