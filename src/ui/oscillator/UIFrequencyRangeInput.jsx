import React from 'react'
import logger from '../../lib/logger'

const defaultI18n = {
  WAVELENGTH: 'Frequency'
}

const sliderStyle = {
  display: 'flex'
}

const sliderItemStyle = {
  margin: '1rem'
}

const sliderInputContainerStyle = {
  ...sliderItemStyle,
  flex: 1
}

const sliderInputStyle = {
  width: '100%'
}

class UIFrequencyRange extends React.PureComponent {
  /** @type {Synth.UIFrequencyRangeInput.Props} */
  static defaultProps = {
    value: 50,
    i18n: defaultI18n,
    onChange: event => undefined
  }

  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug(this.props, 'UIFrequencyRange.render')

    return (
      <div className='frequency-range' style={sliderStyle}>
        <label style={sliderInputContainerStyle}>
          <input
            style={sliderInputStyle}
            type='range'
            min='0'
            max='3000'
            onChange={this.props.onChange}
            value={this.props.value} />
        </label>
        <span style={sliderItemStyle}>{this.i18n.WAVELENGTH}: {this.props.value}</span>
      </div>
    )
  }
}

export default UIFrequencyRange
