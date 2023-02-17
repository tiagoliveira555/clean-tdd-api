import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '@/presentation/helpers/validators'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import { Validation } from '@/presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
