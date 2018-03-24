import { createLogger } from 'browser-bunyan'

const logger = createLogger({
  name: 'client-logger',
  level: 'debugger'
})

export default logger
