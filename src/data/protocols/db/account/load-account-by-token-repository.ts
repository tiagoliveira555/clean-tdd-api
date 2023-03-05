export interface LoadAccountByTokenRepository {
  loadByToken: (input: LoadAccountByTokenRepository.Input) => Promise<LoadAccountByTokenRepository.Output>
}

export namespace LoadAccountByTokenRepository {
  export type Input = {
    accessToken: string
    role?: string
  }

  export type Output = {
    id: string
  }
}
