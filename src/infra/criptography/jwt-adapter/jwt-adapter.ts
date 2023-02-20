import { Decrypter, Encrypter } from '@/data/protocols/criptography'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return await Promise.resolve(accessToken)
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return await Promise.resolve(null)
  }
}
