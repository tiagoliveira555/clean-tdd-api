import { MissingParamsError } from '@/presentation/errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParamsError('field')
    }
  }
  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return sut
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_valud' })
    expect(error).toEqual(new MissingParamsError('field'))
  })
})
