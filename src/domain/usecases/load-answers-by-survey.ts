export interface LoadAnswersBySurvey {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurvey.Output>
}

export namespace LoadAnswersBySurvey {
  export type Output = string[]
}
