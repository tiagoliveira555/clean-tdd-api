export interface LoadAnswersBySurveyRepository {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurveyRepository.Output>
}

export namespace LoadAnswersBySurveyRepository {
  export type Output = string[]
}
