import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, EncrypterSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAccountInput } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbAddAccount
  encrypterSpy: EncrypterSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.result = null
  const sut = new DbAddAccount(encrypterSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)
  return {
    sut,
    encrypterSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterSpy } = makeSut()
    const accountParams = mockAccountInput()
    await sut.add(accountParams)
    expect(encrypterSpy.plaintext).toBe(accountParams.password)
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountInput())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, encrypterSpy } = makeSut()
    const addAccountParams = mockAccountInput()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.input).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: encrypterSpy.ciphertext
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountInput())
    await expect(promise).rejects.toThrow()
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAccountInput())
    expect(isValid).toBe(true)
  })

  it('should return false if addAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const isValid = await sut.add(mockAccountInput())
    expect(isValid).toBe(false)
  })

  it('should return false if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      password: faker.internet.password()
    }
    const isValid = await sut.add(mockAccountInput())
    expect(isValid).toBe(false)
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const accountParams = mockAccountInput()
    await sut.add(accountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(accountParams.email)
  })
})
