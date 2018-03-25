import logger from '../../lib/logger'

const OSCILLATOR_CHANGED = 'oscillatorChanged'
const WAVELENGTH_CHANGED = 'wavelengthChanged'

/** @type {Synth.State} */
const defaultState = {
  wavelength: 50,
  oscillatorType: 'square',
  i18n: {}
}

/**
 * @param {Synth.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = defaultState, action) {
  switch (action.type) {
    case OSCILLATOR_CHANGED:
      logger.debug(`synthReducer: ${OSCILLATOR_CHANGED} to ${action.payload}`)

      state.oscillatorType = action.payload

      return state

    case WAVELENGTH_CHANGED:
      logger.debug(`synthReducer: ${WAVELENGTH_CHANGED} to ${action.payload}`)

      state.wavelength = action.payload

      return state

    default:
      logger.debug('synthReducer: no state change')

      return state
  }
}

export default reducer
