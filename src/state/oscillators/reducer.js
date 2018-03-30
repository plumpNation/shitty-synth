import logger from '../../lib/logger'
import { CREATE, UPDATE, DESTROY } from './actions'

export default reducer

/**
 * @param {Oscillators.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = [], action) {
  logger.debug(action.payload, 'synthReducer.' + action.type)

  switch (action.type) {
    case CREATE:
      return state.concat(createNewSynth(state))

    case UPDATE:
      logger.debug(action.payload, `synthReducer: ${UPDATE}`)

      return state.map(synth => {
        if (synth.id !== action.payload.id) {
          return synth
        }

        return {...synth, ...action.payload}
      })

    case DESTROY:
      logger.debug(action.payload, `synthReducer: ${DESTROY}`)

      return state.filter(synth => synth.id !== action.payload.id)

    default:
      logger.debug('synthReducer: no state change')

      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/** @type {Oscillator.State} */
const defaultSynthState = {
  id: null,
  frequency: 100,
  oscillatorType: 'sine'
}

/**
 * @param {Oscillators.State} synths
 * @returns {Oscillator.State}
 */
function createNewSynth (synths) {
  if (synths.length === 6) {
    logger.warn('jeff says "no more synths for you"')

    return
  }

  /** @type {Oscillator.Id} */
  const lastInsertId = ((synths[synths.length - 1] || {}).id || 0)

  return {...defaultSynthState, id: lastInsertId + 1}
}
