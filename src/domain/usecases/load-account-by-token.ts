export interface LoadAccountByToken {
  load: (input: LoadAccountByToken.Input) => Promise<LoadAccountByToken.Output>
}

export namespace LoadAccountByToken {
  export type Input = {
    accessToken: string
    role?: string
  }

  export type Output = {
    id: string
  }
}
