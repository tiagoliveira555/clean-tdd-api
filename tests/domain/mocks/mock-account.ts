import { AddAccount, Authentication } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAuthenticationParams = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountInput = (): AddAccount.Input => ({
  ...mockAuthenticationParams(),
  name: faker.name.fullName()
})
