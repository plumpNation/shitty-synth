import logger from '../../lib/logger'
import OscillatorActions from './actions'

export default reducer

/**
 * @param {Synth.Oscillators.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = [], action) {
  logger.debug(action.payload, 'synthReducer.' + action.type)

  switch (action.type) {
    case OscillatorActions.ADD:
      return state.concat(addOscillator(state))

    case OscillatorActions.UPDATE:
      logger.debug(action.payload, `synthReducer: ${OscillatorActions.UPDATE}`)

      return state.map(synth => {
        if (synth.id !== action.payload.id) {
          return synth
        }

        return {...synth, ...action.payload}
      })

    case OscillatorActions.REMOVE:
      logger.debug(action.payload, `synthReducer: ${OscillatorActions.REMOVE}`)

      return state.filter(synth => synth.id !== action.payload.id)

    default:
      logger.debug('synthReducer: no state change')

      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/** @type {Synth.Oscillator.State} */
const defaultOscillator = {
  id: null,
  frequency: 100,
  type: 'sine'
}

/**
 * @param {Synth.Oscillators.State} state
 * @param {Synth.Oscillators.AddPayload} state
 * @returns {Synth.Oscillator.State}
 */
function addOscillator (state, payload) {
  if (state.length === 6) {
    logger.warn('jeff says "no more oscillators for you"')

    return
  }

  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((state[state.length - 1] || {}).id || 0)
  const newOscillator = payload || defaultOscillator

  return {...newOscillator, id: lastInsertId + 1}
}
