import React from 'react'
import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  SQUARE: 'Square',
  SINE: 'Sine',
  SAWTOOTH: 'Sawtooth',
  TRIANGLE: 'Triange',
  TYPE: 'Type'
}

class UIWaveTypeInput extends React.PureComponent {
  /** @type {Synth.UIWaveTypeInput.Props} */
  static defaultProps = {
    i18n: defaultI18n,
    value: 'sine',
    onChange: event => undefined
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'UIWaveTypeInput.render')

    return (
      <div className='wave-type-input'>
        <label>
          <span className='wave-type-input__label__text'>{this.i18n.TYPE}</span>
          <select onChange={this.props.onChange} value={this.props.value}>
            <option value='sine'>{this.i18n.SINE}</option>
            <option value='square'>{this.i18n.SQUARE}</option>
            <option value='sawtooth'>{this.i18n.SAWTOOTH}</option>
            <option value='triangle'>{this.i18n.TRIANGLE}</option>
          </select>
        </label>
      </div>
    )
  }
}

export default UIWaveTypeInput
