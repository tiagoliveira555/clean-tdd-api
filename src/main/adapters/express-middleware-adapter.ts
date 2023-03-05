import { Middleware } from '@/presentation/protocols'

import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const output = await middleware.handle(input)
    if (output.statusCode === 200) {
      Object.assign(req, output.body)
      next()
    } else {
      res.status(output.statusCode).json({
        error: output.body.message
      })
    }
  }
}
