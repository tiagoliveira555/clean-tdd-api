import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, EncrypterSpy, CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAccountInput } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  encrypterSpy: EncrypterSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(encrypterSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
  return {
    sut,
    encrypterSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
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

  it('should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAccountInput())
    expect(isValid).toBe(false)
  })

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const accountParams = mockAccountInput()
    await sut.add(accountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(accountParams.email)
  })
})
