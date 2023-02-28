import { Authentication, AuthenticationParams, AddAccount, AddAccountParams, LoadAccountByToken, LoadAccountByTokenParams } from '@/domain/usecases/account'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mock'

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
  authenticatinParams: AuthenticationParams
  token = faker.datatype.uuid()

  async auth (authenticatinParams: AuthenticationParams): Promise<string> {
    this.authenticatinParams = authenticatinParams
    return await Promise.resolve(this.token)
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
