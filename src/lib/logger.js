import { createLogger } from 'browser-bunyan'

/** @type {string} */
const name = 'client-logger'

/** @type {Logger.LogLevelString} */
const defaultLevel = 'warn'

// Useful way to set the level and keep it while working.
/** @type {Logger.LogLevelString} */
const level = window.localStorage.getItem('logLevel') || defaultLevel

const logger = createLogger({name, level})

export default logger
