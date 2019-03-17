import React from 'react'

import {sliderContainer, slider, sliderInput} from './UISliderInput.styl';

import logger from '../../../lib/logger'

class UIFrequencyRange extends React.PureComponent {
  /** @type {Synth.UISliderInput.Props} */
  static defaultProps = {
    min: 0,
    max: 100,
    value: 50,
    name: 'Slider',
    onChange: event => undefined
  }

  render () {
    logger.debug(this.props, 'UIFrequencyRange.render')

    return (
      <div className={sliderContainer}>
        <label className={slider}>
          <input
            className={sliderInput}
            type='range'
            min='0'
            max='3000'
            onChange={this.props.onChange}
            value={this.props.value}
          />
          <span>{this.props.name}: {this.props.value}</span>
        </label>
      </div>
    )
  }
}

export default UIFrequencyRange
