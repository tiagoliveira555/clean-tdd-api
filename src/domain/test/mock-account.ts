import { AccountModel } from '@/domain/models'
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases/account'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountParams = (): AddAccountParams => ({
  ...mockAuthenticationParams(),
  name: 'any_name'
})

export const mockAccountModel = (): AccountModel => ({
  ...mockAccountParams(),
  id: 'any_id'
})
