import logger from '../../lib/logger'
import React from 'react'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WaveLengthRange from '../inputs/WaveLengthRange'

class SubSynth extends React.Component {
  /** @type {Synth.SynthProps} */
  static defaultProps = {
    oscillatorType: 'square',
    waveLength: 50
  }

  constructor (props) {
    super(props)

    this.state = {
      oscillatorType: props.oscillatorType,
      waveLength: props.waveLength
    }
  }

  render (props, state) {
    logger.debug('SubSynth: rendering')

    return (
      <section className='subsynth'>
        <h2>Sub Synth</h2>
        <section className='oscillator-controls'>
          <h3>Oscillator</h3>
          <WaveLengthRange value={this.state.waveLength} />
          <OscillatorSelect value={this.state.oscillatorType} />
        </section>
      </section>
    )
  }
}

export default SubSynth
