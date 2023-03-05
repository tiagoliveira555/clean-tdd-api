import { makeAuthMiddleware } from './auth-middleware-factory'
import { adaptMiddleware } from '@/main/adapters'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
