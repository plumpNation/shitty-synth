import { createLogger } from 'browser-bunyan'

const logger = createLogger({
  name: 'client-logger',
  level: 'debug'
})

export default logger
