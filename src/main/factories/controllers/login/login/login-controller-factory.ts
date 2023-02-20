import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoginController } from '@/presentation/controllers/login/login'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
