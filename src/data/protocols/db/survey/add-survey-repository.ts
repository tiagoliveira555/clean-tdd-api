import { AddSurvey } from '@/domain/usecases'

export interface AddSurveyRepository {
  add: (input: AddSurveyRepository.Input) => Promise<void>
}

export namespace AddSurveyRepository {
  export type Input = AddSurvey.Input
}
