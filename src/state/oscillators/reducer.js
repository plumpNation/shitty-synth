import logger from '../../lib/logger'
import OscillatorActions from './actions'

/** @type {Synth.OscillatorModule.State} */
const defaultOscillator = {
  frequency: 100,
  type: 'sine',
  isActive: true
}

export default reducer

/**
 * @param {Synth.Oscillators.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = [], action) {
  switch (action.type) {
    case OscillatorActions.ADD:
      return state.concat(addOscillator(state, defaultOscillator))

    case OscillatorActions.UPDATE:
      return state.map(synth => {
        if (synth.id !== action.payload.id) {
          return synth
        }

        return {...synth, ...action.payload}
      })

    case OscillatorActions.REMOVE:
      return state.filter(synth => synth.id !== action.payload.id)

    default:
      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Synth.Oscillators.State} state
 * @param {Synth.OscillatorModule.State | undefined} payload
 * @returns {Synth.OscillatorModule.State}
 */
function addOscillator (state, payload) {
  if (state.length === 6) {
    logger.warn('Jeff says "no more oscillators for you"')

    return
  }

  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((state[state.length - 1] || {}).id || 0)

  return {...payload, id: lastInsertId + 1}
}
