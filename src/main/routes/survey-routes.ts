import { adaptRoute } from '@/main/adapters'
import { adminAuth, auth } from '@/main/factories/middlewares'
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
