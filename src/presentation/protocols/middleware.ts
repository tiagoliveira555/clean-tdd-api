import { HttpRequest, Output } from './http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<Output>
}
