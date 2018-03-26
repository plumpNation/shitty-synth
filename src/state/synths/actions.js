import logger from '../../lib/logger'

/** @type {string} */
const SYNTH_CREATE = 'synthCreate'
/** @type {string} */
const SYNTH_UPDATE = 'synthUpdate'
/** @type {string} */
const SYNTH_DELETE = 'synthDelete'

export {
  SYNTH_CREATE,
  SYNTH_UPDATE,
  SYNTH_DELETE,

  synthCreate,
  synthUpdate,
  synthDelete
}

/**
 * @param {SynthAction.CreatePayload} payload
 * @returns {Redux.Action}
 */
function synthCreate (payload) {
  logger.debug(payload, 'synthsAction.synthCreate')

  return {
    type: SYNTH_CREATE,
    payload
  }
}

/**
 * @param {SynthAction.CreatePayload} payload
 * @returns {Redux.Action}
 */
function synthUpdate (payload) {
  logger.debug(payload, 'synthsAction.synthUpdate')

  return {
    type: SYNTH_UPDATE,
    payload
  }
}

/**
 * @param {SynthAction.DeletePayload} payload
 * @returns {Redux.Action}
 */
function synthDelete (payload) {
  logger.debug(payload, 'synthsAction.synthDelete')

  return {
    type: SYNTH_DELETE,
    payload
  }
}
