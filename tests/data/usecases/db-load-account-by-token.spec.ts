import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  let token: string
  let role: string

  beforeEach(() => {
    token = faker.datatype.uuid()
    role = faker.datatype.uuid()
  })

  it('should call Dcrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load({ accessToken: token, role })
    expect(decrypterSpy.ciphertext).toEqual(token)
  })

  it('should return null if Dcrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load({ accessToken: token, role })
    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load({ accessToken: token, role })
    expect(loadAccountByTokenRepositorySpy.input).toEqual({ accessToken: token, role })
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load({ accessToken: token, role })
    expect(account).toBeNull()
  })

  it('should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load({ accessToken: token, role })
    expect(account).toEqual(loadAccountByTokenRepositorySpy.result)
  })

  it('should return null if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
    const account = await sut.load({ accessToken: token, role })
    expect(account).toBeNull()
  })

  it('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockRejectedValueOnce(new Error())
    const promise = sut.load({ accessToken: token, role })
    await expect(promise).rejects.toThrow()
  })
})
