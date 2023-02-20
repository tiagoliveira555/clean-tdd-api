import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey'

import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
