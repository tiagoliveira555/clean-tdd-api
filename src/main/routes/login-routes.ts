import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers/signup'
import { makeLoginController } from '@/main/factories/controllers/login'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
