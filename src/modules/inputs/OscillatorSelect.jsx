import React from 'react'
import logger from '../../lib/logger'

const defaultI18n = {
  SQUARE: 'Square',
  ROUND: 'Round',
  SAW: 'Saw'
}

class OscillatorSelect extends React.PureComponent {
  /** @type {Synth.OscillatorSelectProps} */
  static defaultProps = {
    value: 'square',
    i18n: defaultI18n
  }

  onChange = onChange.bind(this)

  render () {
    logger.debug('OscillatorSelect: rendering')

    return (
      <div className='oscillator-select'>
        <label>
          <span>Type: {this.props.value}</span>
          <select onChange={this.onChange}>
            <option value='square'>{this.props.i18n.SQUARE}</option>
            <option value='saw'>{this.props.i18n.SAW}</option>
            <option value='round'>{this.props.i18n.ROUND}</option>
          </select>
        </label>
      </div>
    )
  }
}

export default OscillatorSelect

function onChange (event) {
  const data = event.target.value

  logger.debug('OscillatorSelect: changed to ' + data)

  this.props.onChange && this.props.onChange(event, data)
}
