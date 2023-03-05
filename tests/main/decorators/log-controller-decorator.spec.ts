import { LogControllerDecorator } from '@/main/dacorators'
import { Controller, Output } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/http'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

class ControllerSpy implements Controller {
  output = ok(faker.datatype.uuid())
  input: any

  async handle (input: any): Promise<Output> {
    this.input = input
    return await Promise.resolve(this.output)
  }
}

const makeServerError = (): Output => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: Controller
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  it('should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const input = faker.lorem.sentence()
    await sut.handle(input)
    expect(controllerSpy.input).toEqual(input)
  })

  it('should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const output = await sut.handle(faker.lorem.sentence())
    expect(output).toEqual(controllerSpy.output)
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = makeServerError()
    controllerSpy.output = serverError
    await sut.handle(faker.lorem.sentence())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
