import { makeSignUpController } from '@/main/factories/signup'
import { adaptRoute } from '@/main/adapters/express-route-adapter'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
