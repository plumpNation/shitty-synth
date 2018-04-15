import logger from '../../lib/logger'
import OscillatorAction from './actions'

export default reducer

/**
 * @param {Synth.Oscillators.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = [], action) {
  logger.debug(action.payload, 'synthReducer.' + action.type)

  switch (action.type) {
    case OscillatorAction.CREATE:
      return state.concat(createNewSynth(state))

    case OscillatorAction.UPDATE:
      logger.debug(action.payload, `synthReducer: ${OscillatorAction.UPDATE}`)

      return state.map(synth => {
        if (synth.id !== action.payload.id) {
          return synth
        }

        return {...synth, ...action.payload}
      })

    case OscillatorAction.DESTROY:
      logger.debug(action.payload, `synthReducer: ${OscillatorAction.DESTROY}`)

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
const defaultSynthState = {
  id: null,
  frequency: 100,
  oscillatorType: 'sine'
}

/**
 * @param {Synth.Oscillators.State} synths
 * @returns {Synth.Oscillator.State}
 */
function createNewSynth (synths) {
  if (synths.length === 6) {
    logger.warn('jeff says "no more synths for you"')

    return
  }

  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((synths[synths.length - 1] || {}).id || 0)

  return {...defaultSynthState, id: lastInsertId + 1}
}
