import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  email: string
  isValidEmail = true

  isValid (email: string): boolean {
    this.email = email
    return this.isValidEmail
  }
}
