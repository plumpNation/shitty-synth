import React from 'react'
import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  SQUARE: 'Square',
  ROUND: 'Round',
  SAW: 'Saw'
}

class OscillatorSelect extends React.PureComponent {
  /** @type {Synth.OscillatorSelectProps} */
  static defaultProps = {
    i18n: defaultI18n,
    value: 'square',
    onChange: event => undefined
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'OscillatorSelect.render')

    return (
      <div className='oscillator-select'>
        <label>
          <span>Type: {this.props.value}</span>
          <select onChange={this.props.onChange} value={this.props.value}>
            <option value='round'>{this.i18n.ROUND}</option>
            <option value='square'>{this.i18n.SQUARE}</option>
            <option value='saw'>{this.i18n.SAW}</option>
          </select>
        </label>
      </div>
    )
  }
}

export default OscillatorSelect
