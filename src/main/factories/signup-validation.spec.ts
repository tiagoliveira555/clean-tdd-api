import { makeSignUpValidation } from './signup-validation'
import { Validation, ValidationComposite } from '@/presentation/helpers/validators'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'

jest.mock('@/presentation/helpers/validators')

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validators: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validators.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validators)
  })
})
