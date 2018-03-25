import logger from '../../lib/logger'

const OSCILLATOR_CHANGED = 'oscillatorChanged'

/** @type {Synth.State} */
const defaultState = {
  wavelength: 50,
  oscillatorType: 'square'
}

/**
 * @param {Synth.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = defaultState, action) {
  switch (action.type) {
    case OSCILLATOR_CHANGED:
      logger.debug(`synthReducer: ${OSCILLATOR_CHANGED}`)

      state.oscillatorType = action.payload

      return state

    default:
      logger.debug('synthReducer: default')
      return state
  }
}

export default reducer
