import { Output } from '@/presentation/protocols'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export const ok = (data: any): Output => ({
  statusCode: 200,
  body: data
})

export const noContent = (): Output => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): Output => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): Output => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): Output => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): Output => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
