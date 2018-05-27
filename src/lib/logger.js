import { createLogger } from 'browser-bunyan'

const logLevels = ['debug', 'info', 'warn', 'error']

/** @type {string} */
const name = 'client-logger'

/** @type {Logger.LogLevelString} */
const defaultLevel = 'warn'

// Useful way to set the level and keep it while working.
/** @type {Logger.LogLevelString} */
const currentLevel = window.localStorage.getItem('logLevel') || defaultLevel

const logger = createLogger({name, currentLevel})

/**
 * @param {string} name
 * @param {Array<Array>} logs
 * @example logger.infoGroup('groupName', [[data, 'message'], [data, 'message']])
 */
logger.infoGroup = (name, logs = []) => {
  if (!shouldLog('info')) {
    return
  }

  console.group(name)

  logs.forEach(log => {
    logger.info(...log)
  })

  console.groupEnd()
}

export default logger

/**
 * @param {Logger.LogLevelString} level
 * @returns {boolean}
 */
function shouldLog (level) {
  return logLevels.indexOf(level) >= logLevels.indexOf(currentLevel)
}
