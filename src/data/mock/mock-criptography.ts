import { Decrypter, Encrypter, HashCompare } from '@/data/protocols/criptography'

import { faker } from '@faker-js/faker'

export class EncrypterSpy implements Encrypter {
  plaintext: string
  ciphertext = faker.datatype.uuid()

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  ciphertext: string
  plaintext = faker.internet.password()

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}

export class HashComparerSpy implements HashCompare {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}
