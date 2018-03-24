import logger from '../../lib/logger'
import React from 'react'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WaveLengthRange from '../inputs/WaveLengthRange'

class SubSynth extends React.Component {
  /** @type {Synth.SynthProps} */
  static defaultProps = {
    type: 'square'
  }

  setOscillator (e) {
    /** @type {Synth.OscillatorType} */
    const type = e.target.value

    this.setState({type})

    logger.debug('SubSynth: set oscillator to ' + type)
  }

  render (props, state) {
    logger.debug('SubSynth: rendering')

    return (
      <section className='subsynth'>
        <h2>Sub Synth</h2>

        <section className='oscillator-controls'>

          <h3>Oscillator</h3>

          <WaveLengthRange />
          <OscillatorSelect value={this.props.type} />

        </section>

      </section>
    )
  }
}

export default SubSynth
