export interface SaveSurveyResultRespository {
  save: (input: SaveSurveyResultRespository.Input) => Promise<void>
}

export namespace SaveSurveyResultRespository {
  export type Input = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
}
