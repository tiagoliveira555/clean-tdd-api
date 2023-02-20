import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddACcount } from '@/main/factories/usecases/account/add-account'
import { SignUpController } from '@/presentation/controllers/login/signup'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddACcount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
