import { Validation, ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}