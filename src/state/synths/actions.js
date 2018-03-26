import logger from '../../lib/logger'

/** @type {string} */
const SYNTH_CREATE = 'synthCreate'
/** @type {string} */
const SYNTH_UPDATE = 'synthUpdate'

export {
  SYNTH_CREATE,
  SYNTH_UPDATE,

  synthCreate,
  synthUpdate
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
