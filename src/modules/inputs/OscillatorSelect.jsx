import React from 'react'
import logger from '../../lib/logger'

const defaultI18n = {
  SQUARE: 'Square',
  ROUND: 'Round',
  SAW: 'Saw'
}

/**
 * @param {Synth.OscillatorSelectProps} props
 * @property {I18n} props.i18n
 * @property {Synth.OscillatorType} props.value
 * @property {Function} props.onChange
 * @returns {JSX.Element}
 */
function OscillatorSelect ({i18n = {}, value = 'square', onChange}) {
  logger.debug('OscillatorSelect: rendering')

  i18n = Object.assign({}, defaultI18n, i18n)

  return (
    <div className='oscillator-select'>
      <label>
        <span>Type: {value}</span>
        <select onChange={onChange}>
          <option value='square'>{i18n.SQUARE}</option>
          <option value='saw'>{i18n.SAW}</option>
          <option value='round'>{i18n.ROUND}</option>
        </select>
      </label>
    </div>
  )
}

export default OscillatorSelect
