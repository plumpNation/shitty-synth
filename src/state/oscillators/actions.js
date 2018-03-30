import logger from '../../lib/logger'

/** @type {string} */
const CREATE = 'oscillatorCreate'
/** @type {string} */
const UPDATE = 'oscillatorUpdate'
/** @type {string} */
const DESTROY = 'oscillatorDestroy'

export {
  CREATE,
  UPDATE,
  DESTROY,

  create,
  update,
  destroy
}

/**
 * @param {OscillatorAction.CreatePayload} payload
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
 * @param {OscillatorAction.CreatePayload} payload
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
 * @param {OscillatorAction.DestroyPayload} payload
 * @returns {Redux.Action}
 */
function destroy (payload) {
  logger.info(payload, 'oscillatorsAction.delete')

  return {
    type: DESTROY,
    payload
  }
}
