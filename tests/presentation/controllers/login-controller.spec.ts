import { LoginController } from '@/presentation/controllers'
import { MissingParamsError } from '@/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'

import { faker } from '@faker-js/faker'
import { AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'

const mockInput = (): LoginController.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(authenticationSpy.input).toEqual({
      email: input.email,
      password: input.password
    })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const output = await sut.handle(mockInput())
    expect(output).toEqual(unauthorized())
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const output = await sut.handle(mockInput())
    expect(output).toEqual(ok(authenticationSpy.result))
  })

  it('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(validationSpy.input).toEqual(input)
  })

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = faker.random.words()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamsError(error))
    const output = await sut.handle(mockInput())
    expect(output).toEqual(badRequest(new MissingParamsError(error)))
  })
})
