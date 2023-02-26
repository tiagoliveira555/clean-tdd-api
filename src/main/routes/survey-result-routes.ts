import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/factories/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
