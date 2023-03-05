export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<AddAccount.Output>
}

export namespace AddAccount {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = boolean
}
