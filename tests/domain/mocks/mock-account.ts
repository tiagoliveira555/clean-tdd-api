import { AccountModel } from '@/domain/models'
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountParams = (): AddAccountParams => ({
  ...mockAuthenticationParams(),
  name: faker.name.fullName()
})

export const mockAccountModel = (): AccountModel => ({
  ...mockAccountParams(),
  id: faker.datatype.uuid()
})
