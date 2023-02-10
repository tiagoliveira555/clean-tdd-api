import { makeSignUpController } from '@/main/factories/signup'
import { adapterRoute } from '@/main/adapters/signup-routes'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
