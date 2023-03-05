export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccountByEmailRepository.Output>
}

export namespace LoadAccountByEmailRepository {
  export type Output = {
    id: string
    name: string
    password: string
  }
}
