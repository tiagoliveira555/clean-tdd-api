import { SurveyModel } from '@/domain/models'

export interface LoadSurveys {
  load: (accountId: string) => Promise<LoadSurveys.Output>
}

export namespace LoadSurveys {
  export type Output = SurveyModel[]
}
