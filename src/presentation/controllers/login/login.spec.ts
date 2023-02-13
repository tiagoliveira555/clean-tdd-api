import { MissingParamsError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { Controller } from '../signup/signup-protocols'
import { LoginController } from './login'

type SutTypes = {
  sut: Controller
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return {
    sut
  }
}

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('email')))
  })

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('password')))
  })
})
