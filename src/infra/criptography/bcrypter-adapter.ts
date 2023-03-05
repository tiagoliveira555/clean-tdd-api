import { Encrypter, HashCompare } from '@/data/protocols/criptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter, HashCompare {
  constructor (
    private readonly salt: number
  ) {}

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
