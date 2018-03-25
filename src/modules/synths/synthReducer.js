import logger from '../../lib/logger'

const OSCILLATOR_CHANGED = 'oscillatorChanged'
const WAVELENGTH_CHANGED = 'wavelengthChanged'

/** @type {Synth.State} */
const defaultState = {
  wavelength: 30,
  oscillatorType: 'round'
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

      return Object.assign({}, state, {oscillatorType: action.payload})

    case WAVELENGTH_CHANGED:
      logger.debug(`synthReducer: ${WAVELENGTH_CHANGED} to ${action.payload}`)

      return Object.assign({}, state, {wavelength: action.payload})

    default:
      logger.debug('synthReducer: no state change')

      return state
  }
}

export default reducer
