import logger from '../../lib/logger'
import { SYNTH_CREATE, SYNTH_UPDATE, SYNTH_DELETE } from './actions'

export default reducer

/**
 * @param {Synths.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = [], action) {
  logger.debug(action.payload, 'synthReducer.' + action.type)

  switch (action.type) {
    case SYNTH_CREATE:
      return state.concat(createNewSynth(state))

    case SYNTH_UPDATE:
      logger.debug(action.payload, `synthReducer: ${SYNTH_UPDATE}`)

      return state.map(synth => {
        if (synth.id !== action.payload.id) {
          return synth
        }

        return {...synth, ...action.payload}
      })

    case SYNTH_DELETE:
      logger.debug(action.payload, `synthReducer: ${SYNTH_DELETE}`)

      return state.filter(synth => synth.id !== action.payload.id)

    default:
      logger.debug('synthReducer: no state change')

      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/** @type {Synth.State} */
const defaultSynthState = {
  id: null,
  frequency: 100,
  oscillatorType: 'sine'
}

/**
 * @param {Synths.State} synths
 * @returns {Synth.State}
 */
function createNewSynth (synths) {
  /** @type {Synth.Id} */
  const lastInsertId = synths[synths.length - 1] || 1

  return {...defaultSynthState, id: lastInsertId}
}
