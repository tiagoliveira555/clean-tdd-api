import { LogControllerDecorator } from '@/main/dacorators'
import { Controller } from '@/presentation/protocols'
import { LogMongoRepository } from '@/infra/db/mongodb/log'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
