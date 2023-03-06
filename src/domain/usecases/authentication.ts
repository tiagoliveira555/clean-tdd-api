export interface Authentication {
  auth: (input: Authentication.Input) => Promise<Authentication.Output>
}

export namespace Authentication {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    accessToken: string
    name: string
  }
}
