import { SurveyModel } from '@/domain/models'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<LoadSurveyById.Output>
}

export namespace LoadSurveyById {
  export type Output = SurveyModel
}
