import { Controller, Output } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db/log'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (input: any): Promise<Output> {
    const httpResponse = await this.controller.handle(input)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
