import { adaptRoute } from '@/main/adapters'
import { adminAuth, auth } from '@/main/factories/middlewares'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/loadSurveys'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
