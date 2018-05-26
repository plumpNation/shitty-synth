import logger from '../../lib/logger'

/** @type {string} */
const ADD = 'oscillatorAdd'
/** @type {string} */
const UPDATE = 'oscillatorUpdate'
/** @type {string} */
const REMOVE = 'oscillatorRemove'

export default {
  ADD,
  UPDATE,
  REMOVE,

  add,
  update,
  remove
}

/**
 * @param {Synth.Oscillator.State} payload
 * @returns {Redux.Action}
 */
function add (payload) {
  logger.info(payload, 'oscillatorsAction.add')

  return {
    type: ADD,
    payload
  }
}

/**
 * @param {Synth.Oscillator.State} payload
 * @returns {Redux.Action}
 */
function update (payload) {
  logger.debug(payload, 'oscillatorsAction.update')

  return {
    type: UPDATE,
    payload
  }
}

/**
 * @param {Synth.Oscillator.State} payload
 * @returns {Redux.Action}
 */
function remove (payload) {
  logger.info(payload, 'oscillatorsAction.delete')

  return {
    type: REMOVE,
    payload
  }
}
