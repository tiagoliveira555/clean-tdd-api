import { makeAuthMiddleware } from './auth-middleware-factory'
import { adaptMiddleware } from '@/main/adapters'

export const auth = adaptMiddleware(makeAuthMiddleware())
