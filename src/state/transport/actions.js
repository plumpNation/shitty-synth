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
  return {
    type: PLAY
  }
}

/**
 * @returns {Redux.Action}
 */
function stop () {
  return {
    type: STOP
  }
}
