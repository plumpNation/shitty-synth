import React, { PureComponent } from 'react'

import {sliderContainer, slider, sliderInput} from './SliderInput.styl';

import logger from '../../../lib/logger'

class FrequencyRange extends PureComponent {
  /** @type {Synth.SliderInputProps} */
  static defaultProps = {
    min: 0,
    max: 100,
    value: 50,
    name: 'Slider',
    onChange: (_) => undefined
  }

  render () {
    logger.debug(this.props, 'FrequencyRange.render')

    return (
      <div className={sliderContainer}>
        <label className={slider}>
          <input
            className={sliderInput}
            type='range'
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <span>{this.props.name}: {this.props.value}</span>
        </label>
      </div>
    )
  }
}

export default FrequencyRange
