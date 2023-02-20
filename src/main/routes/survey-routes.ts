import { adaptRoute } from '@/main/adapters'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
