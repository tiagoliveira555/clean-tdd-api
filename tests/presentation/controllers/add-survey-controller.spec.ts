import { AddSurveyController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { AddSurveySpy, ValidationSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'
import MockDate from 'mockdate'

const mockInput = (): AddSurveyController.Input => ({
  question: faker.random.word(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word()
  }]
})

type SutTypes = {
  sut: AddSurveyController
  validationSpy: ValidationSpy
  addSurveySpy: AddSurveySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSurveySpy = new AddSurveySpy()
  const sut = new AddSurveyController(validationSpy, addSurveySpy)
  return {
    sut,
    validationSpy,
    addSurveySpy
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(validationSpy.input).toEqual({
      question: input.question,
      answers: input.answers
    })
  })

  it('should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(badRequest(new Error()))
  })

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveySpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(addSurveySpy.data).toEqual({ ...input, date: new Date() })
  })

  it('should return 500 if AddSurvey twrows', async () => {
    const { sut, addSurveySpy } = makeSut()
    jest.spyOn(addSurveySpy, 'add').mockRejectedValueOnce(new Error())
    const output = await sut.handle(mockInput())
    expect(output).toEqual(serverError(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()
    const output = await sut.handle(mockInput())
    expect(output).toEqual(noContent())
  })
})
