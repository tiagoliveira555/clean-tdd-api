import { AddAccount, AuthenticationParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountInput = (): AddAccount.Input => ({
  ...mockAuthenticationParams(),
  name: faker.name.fullName()
})
