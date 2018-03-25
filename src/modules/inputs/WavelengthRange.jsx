import React from 'react'
import logger from '../../lib/logger'

const defaultI18n = {
  WAVELENGTH: 'Wavelength'
}

class WavelengthRange extends React.PureComponent {
  /** @type {Synth.WavelengthRangeProps} */
  static defaultProps = {
    value: 50,
    i18n: defaultI18n
  }

  setWavelength = setWavelength.bind(this)

  render () {
    logger.debug('WavelengthRange: rendering')

    return (
      <div className='wavelength-range'>
        <label>
          <span>{this.props.i18n.WAVELENGTH}: {this.props.value}</span>
          <input type='range' onChange={this.setWavelength} />
        </label>
      </div>
    )
  }
}

export default WavelengthRange

function setWavelength (event) {
  /** @type {Synth.Wavelength} */
  const data = event.target.value

  logger.debug('WavelengthRange: changed to ' + data)

  this.props.onChange && this.props.onChange(event, data)
}
