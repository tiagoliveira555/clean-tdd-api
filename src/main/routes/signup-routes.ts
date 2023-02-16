import { makeSignUpController } from '@/main/factories/signup'
import { adapterRoutes } from '@/main/adapters/adapter-routes'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adapterRoutes(makeSignUpController()))
}
