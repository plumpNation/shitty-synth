import logger from '../../lib/logger'

export {
  oscillatorChanged,
  wavelengthChanged
}

/** @type {string} */
const OSCILLATOR_CHANGED = 'oscillatorChanged'
const WAVELENGTH_CHANGED = 'wavelengthChanged'

/**
 * @param {Synth.OscillatorType} payload
 * @returns {Redux.Action}
 */
function oscillatorChanged (payload) {
  logger.debug('ACTION: synth.oscillatorChanged')

  return {
    type: OSCILLATOR_CHANGED,
    payload
  }
}

/**
 * @param {Synth.Wavelength} payload
 * @returns {Redux.Action}
 */
function wavelengthChanged (payload) {
  logger.debug('ACTION: synth.wavelengthChanged')

  return {
    type: WAVELENGTH_CHANGED,
    payload
  }
}
