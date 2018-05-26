import React from 'react'
import logger from '../../../lib/logger'

const defaultI18n = {
  WAVELENGTH: 'Frequency'
}

class FrequencyRange extends React.PureComponent {
  /** @type {Synth.OscillatorModule.FrequencyRangeProps} */
  static defaultProps = {
    value: 50,
    i18n: defaultI18n,
    onChange: event => undefined
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'FrequencyRange.render')

    return (
      <div className='frequency-range'>
        <label>
          <span>{this.i18n.WAVELENGTH}: {this.props.value}</span>
          <input
            type='range'
            min='100'
            max='3000'
            onChange={this.props.onChange}
            value={this.props.value} />
        </label>
      </div>
    )
  }
}

export default FrequencyRange
