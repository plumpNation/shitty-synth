import React from 'react'
import logger from '../../lib/logger'

const defaultI18n = {
  WAVELENGTH: 'Wavelength'
}

class WavelengthRange extends React.PureComponent {
  /** @type {Synth.WavelengthRangeProps} */
  static defaultProps = {
    value: 50,
    i18n: defaultI18n,
    onChange: event => undefined
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'WavelengthRange.render')

    return (
      <div className='wavelength-range'>
        <label>
          <span>{this.i18n.WAVELENGTH}: {this.props.value}</span>
          <input
            type='range'
            onChange={this.props.onChange}
            value={this.props.value} />
        </label>
      </div>
    )
  }
}

export default WavelengthRange
