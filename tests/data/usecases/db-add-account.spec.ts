import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, EncrypterSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAccountModel, mockAccountParams } from '@/tests/domain/mocks'

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
  loadAccountByEmailRepositorySpy.accountModel = null
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
    const accountParams = mockAccountParams()
    await sut.add(accountParams)
    expect(encrypterSpy.plaintext).toBe(accountParams.password)
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, encrypterSpy } = makeSut()
    const addAccountParams = mockAccountParams()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.accountParams).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: encrypterSpy.ciphertext
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const account = await sut.add(mockAccountParams())
    expect(account).toEqual(addAccountRepositorySpy.accountModel)
  })

  it('should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
    const account = await sut.add(mockAccountParams())
    expect(account).toBeNull()
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const accountParams = mockAccountParams()
    await sut.add(accountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(accountParams.email)
  })
})
