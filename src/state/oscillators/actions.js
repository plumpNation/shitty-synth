import logger from '../../lib/logger'

/** @type {string} */
const CREATE = 'oscillatorCreate'
/** @type {string} */
const UPDATE = 'oscillatorUpdate'
/** @type {string} */
const DESTROY = 'oscillatorDestroy'

export default {
  CREATE,
  UPDATE,
  DESTROY,

  create,
  update,
  destroy
}

/**
 * @param {Synth.OscillatorActions.CreatePayload} payload
 * @returns {Redux.Action}
 */

/**
 * @param {Synth.OscillatorActions.CreatePayload} payload
 * @returns {Redux.Action}
 */
function create (payload) {
  logger.info(payload, 'oscillatorsAction.create')

  return {
    type: CREATE,
    payload
  }
}

/**
 * @param {Synth.OscillatorActions.CreatePayload} payload
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
 * @param {Synth.OscillatorActions.DestroyPayload} payload
 * @returns {Redux.Action}
 */
function destroy (payload) {
  logger.info(payload, 'oscillatorsAction.delete')

  return {
    type: DESTROY,
    payload
  }
}
