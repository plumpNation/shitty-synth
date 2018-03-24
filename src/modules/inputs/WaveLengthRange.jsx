import React from 'react'
import logger from '../../lib/logger'

class WaveLengthRange extends React.Component {
  /** @type {Synth.WaveLengthRangeProps} */
  static defaultProps = {
    waveLength: 50
  }

  constructor (props) {
    super(props)

    /** @type {Synth.WaveLengthRangeState} */
    this.state = {
      waveLength: props.waveLength
    }
  }

  setWaveLength (e) {
    /** @type {Synth.WaveLength} */
    const waveLength = e.target.value

    this.setState({waveLength})

    logger.debug('WaveLengthRange: wavelength set to ' + waveLength)
  }

  render () {
    logger.debug('WaveLengthRange: rendering')

    return (
      <label>
        <span>Wave length: {this.state.waveLength}</span>
        <input type='range' onChange={event => this.setWaveLength(event)} />
      </label>
    )
  }
}

export default WaveLengthRange
