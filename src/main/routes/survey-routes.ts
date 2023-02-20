import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/loadSurveys'

import { Router } from 'express'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
