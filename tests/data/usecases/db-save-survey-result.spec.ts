import { DbSaveSurveyResult } from '@/data/usecases'
import { LoadSurveyResultRespositorySpy, SaveSurveyResultRespositorySpy } from '@/tests/data/mocks'
import { mockSaveSurveyResultInput } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySpy: SaveSurveyResultRespositorySpy
  loadSurveyResultRepositorySpy: LoadSurveyResultRespositorySpy
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySpy = new SaveSurveyResultRespositorySpy()
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRespositorySpy()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySpy, loadSurveyResultRepositorySpy)
  return {
    sut,
    saveSurveyResultRepositorySpy,
    loadSurveyResultRepositorySpy
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    const surveyResultData = mockSaveSurveyResultInput()
    await sut.save(surveyResultData)
    expect(saveSurveyResultRepositorySpy.input).toEqual(surveyResultData)
  })

  it('should throws SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(saveSurveyResultRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultInput())
    await expect(promise).rejects.toThrow()
  })

  it('should call LoadSurveyResultReposistory with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResultParams = mockSaveSurveyResultInput()
    await sut.save(surveyResultParams)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyResultParams.surveyId)
  })

  it('should throws LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultInput())
    await expect(promise).rejects.toThrow()
  })

  it('should return SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultInput())
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.result)
  })
})
