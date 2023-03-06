import { SurveyModel } from '@/domain/models'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Output>
}

export namespace LoadSurveyByIdRepository {
  export type Output = SurveyModel
}
