import { Authentication, AuthenticationParams, AddAccount, LoadAccountByToken } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models'

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
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authenticationModel)
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
