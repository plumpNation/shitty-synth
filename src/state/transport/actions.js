import logger from '../../lib/logger'

/** @type {string} */
const PLAY = 'transportPlay'
/** @type {string} */
const STOP = 'transportStop'

export default {
  PLAY,
  STOP,

  play,
  stop
}

/**
 * @returns {Redux.Action}
 */
function play () {
  logger.info('transportAction.play')

  return {
    type: PLAY
  }
}

/**
 * @returns {Redux.Action}
 */
function stop () {
  logger.info('transportAction.stop')

  return {
    type: STOP
  }
}
