import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db/account'
import { MongoHelper } from '@/infra/db/mongodb'

import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (input: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(input)
    return result !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Output> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken ({ accessToken, role }: LoadAccountByTokenRepository.Input): Promise<LoadAccountByTokenRepository.Output> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
