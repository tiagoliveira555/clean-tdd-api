import { SurveyModel } from '@/domain/models'

export interface AddSurvey {
  add: (input: AddSurvey.Input) => Promise<void>
}

export namespace AddSurvey {
  export type Input = Omit<SurveyModel, 'id'>
}
