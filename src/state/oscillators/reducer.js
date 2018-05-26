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
      return state.concat(addOscillator(state, action.payload))

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

/** @type {Synth.OscillatorModule.State} */
const defaultOscillator = {
  frequency: 100,
  type: 'sine'
}

/**
 * @param {Synth.Oscillators.State} state
 * @param {Synth.OscillatorModule.State | undefined} payload
 * @returns {Synth.OscillatorModule.State}
 */
function addOscillator (state, payload) {
  if (state.length === 6) {
    logger.warn('jeff says "no more oscillators for you"')

    return
  }

  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((state[state.length - 1] || {}).id || 0)
  const newOscillator = removeRedux(payload) || defaultOscillator

  return {...newOscillator, id: lastInsertId + 1}
}

/**
 * If we want to be able to persist redux state in the localStorage, we must
 * remove the circular dependencies that Redux adds to the payload.
 *
 * @param {Synth.OscillatorModule.State} payload
 * @returns {Synth.OscillatorModule.State | null}
 */
function removeRedux (payload) {
  if (!isValidOscillator(payload)) {
    return null
  }

  const {frequency, type} = payload

  return {frequency, type}
}

/**
 * Checks that the data shares all keys in the defaultOscillator
 *
 * @see defaultOscillator
 * @param {Synth.OscillatorModule.State} data
 * @returns {boolean}
 */
function isValidOscillator (data) {
  return !(Object.keys(defaultOscillator).some(key => !data[key]))
}
