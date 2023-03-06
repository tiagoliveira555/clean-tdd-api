import { SignUpController } from '@/presentation/controllers'
import { MissingParamsError, ServerError, EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AddAccountSpy, AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

const mockInput = (): SignUpController.Input => {
  const password = faker.internet.password()
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new ServerError(null)))
  })

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(addAccountSpy.input).toEqual({
      name: input.name,
      email: input.email,
      password: input.password
    })
  })

  it('should return 401 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const output = await sut.handle(mockInput())
    expect(output).toEqual(forbidden(new EmailInUseError()))
  })

  it('should return 200 if valid data is provided', async () => {
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

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(authenticationSpy.input).toEqual({
      email: input.email,
      password: input.password
    })
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })
})
