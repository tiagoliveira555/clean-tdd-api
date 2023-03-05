import { Output } from './http'

export interface Controller<T = any> {
  handle: (input: T) => Promise<Output>
}
