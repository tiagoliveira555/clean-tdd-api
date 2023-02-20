import { adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from './auth-middleware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
