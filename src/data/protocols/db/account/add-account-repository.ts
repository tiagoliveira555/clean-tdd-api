import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Input) => Promise<AddAccountRepository.Output>
}

export namespace AddAccountRepository {
  export type Input = AddAccount.Input
  export type Output = boolean
}
