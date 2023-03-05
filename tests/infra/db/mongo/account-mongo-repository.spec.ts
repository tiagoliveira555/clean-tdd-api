import { MongoHelper, AccountMongoRepository } from '@/infra/db/mongodb'
import { mockAccountInput } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    it('should return an account on add success', async () => {
      const sut = makeSut()
      const params = mockAccountInput()
      const isValid = await sut.add(params)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    it('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const params = mockAccountInput()
      await accountCollection.insertOne(params)
      const account = await sut.loadByEmail(params.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(params.name)
      expect(account.password).toBe(params.password)
    })

    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAccountInput())
      const account = await accountCollection.findOne(res.insertedId)
      expect(account.accessToken).toBeFalsy()
      await sut.updateAccessToken(account._id.toHexString(), 'any_token')
      const updatedAccount = await accountCollection.findOne(res.insertedId)
      expect(updatedAccount).toBeTruthy()
      expect(updatedAccount.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.fullName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.datatype.uuid()

    beforeEach(() => {
      name = faker.name.fullName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.datatype.uuid()
    })

    it('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken({ accessToken })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken({ accessToken, role: 'admin' })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken({ accessToken, role: 'admin' })
      expect(account).toBeFalsy()
    })

    it('should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken({ accessToken })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken({ accessToken })
      expect(account).toBeFalsy()
    })
  })
})
