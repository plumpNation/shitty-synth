import logger from '../../lib/logger'

const actionLoggerMiddleware = store => next => action => {
  let result = next(action)

  logger.infoGroup(action.type, [
    [action, 'dispatching'],
    [store.getState(), 'next state']
  ])

  return result
}

export default actionLoggerMiddleware
