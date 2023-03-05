import { Controller } from '@/presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const input = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }
    const output = await controller.handle(input)
    if (output.statusCode >= 200 && output.statusCode <= 299) {
      res.status(output.statusCode).json(output.body)
    } else {
      res.status(output.statusCode).json({
        error: output.body.message
      })
    }
  }
}
