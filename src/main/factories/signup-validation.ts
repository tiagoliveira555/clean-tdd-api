import { Validation, ValidationComposite } from '@/presentation/helpers/validators'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validators: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validators.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validators)
}
