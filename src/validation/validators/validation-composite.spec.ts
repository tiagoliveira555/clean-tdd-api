import { ValidationComposite } from './validation-composite'
import { MissingParamsError } from '@/presentation/errors'
import { ValidationSpy } from '@/presentation/mock'

type SutTypes = {
  sut: ValidationComposite
  validationSpy: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpy = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[1], 'validate').mockReturnValueOnce(new MissingParamsError('field'))
    const error = sut.validate({ field: 'any_valud' })
    expect(error).toEqual(new MissingParamsError('field'))
  })

  it('should return the first errror if more then one validation fails', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationSpy[1], 'validate').mockReturnValueOnce(new MissingParamsError('field'))
    const error = sut.validate({ field: 'any_valud' })
    expect(error).toEqual(new Error())
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_valud' })
    expect(error).toBeFalsy()
  })
})
