import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

const mockInput = (): AuthMiddleware.Input => ({
  accessToken: faker.datatype.uuid()
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const output = await sut.handle({})
    expect(output).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const role = faker.datatype.uuid()
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const input = mockInput()
    const { accessToken } = input
    await sut.handle(input)
    expect(loadAccountByTokenSpy.input).toEqual({ accessToken, role })
  })

  it('should return 403 if LoadAccountToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 200 if LoadAccountToken returns account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const output = await sut.handle(mockInput())
    expect(output).toEqual(ok({ accountId: loadAccountByTokenSpy.result.id }))
  })

  it('should return 500 if LoadAccountToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })
})
