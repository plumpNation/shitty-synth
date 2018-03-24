import React from 'react'
import logger from '../../lib/logger'

class WaveLengthRange extends React.Component {
  /** @type {Synth.WaveLengthRangeProps} */
  static defaultProps = {
    value: 50
  }

  constructor (props) {
    super(props)

    /** @type {Synth.WaveLengthRangeState} */
    this.state = {
      value: props.value
    }
  }

  setWaveLength (e) {
    /** @type {Synth.WaveLength} */
    const value = e.target.value

    this.setState({value})

    logger.debug('WaveLengthRange: wavelength set to ' + value)
  }

  render () {
    logger.debug('WaveLengthRange: rendering')

    return (
      <label>
        <span>Wave length: {this.state.value}</span>
        <input type='range' onChange={event => this.setWaveLength(event)} />
      </label>
    )
  }
}

export default WaveLengthRange
