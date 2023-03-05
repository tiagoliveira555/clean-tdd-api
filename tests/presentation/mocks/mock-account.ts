import { Authentication, AuthenticationParams, AddAccount, AddAccountParams, LoadAccountByToken, LoadAccountByTokenParams } from '@/domain/usecases'
import { AccountModel, AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  account: AddAccountParams
  accountModel = mockAccountModel()

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.account = account
    return this.accountModel
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
  loadAccountByTokenParams: LoadAccountByTokenParams
  accountModel = mockAccountModel()

  async load (loadAccountByTokenParams: LoadAccountByTokenParams): Promise<AccountModel> {
    this.loadAccountByTokenParams = loadAccountByTokenParams
    return await Promise.resolve(this.accountModel)
  }
}
