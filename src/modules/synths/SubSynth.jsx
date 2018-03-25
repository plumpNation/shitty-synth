import logger from '../../lib/logger'
import React from 'react'
import { connect } from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WavelengthRange from '../inputs/WavelengthRange'

import { oscillatorChanged, wavelengthChanged } from '../synths/synthActions'

const defaultI18n = {
  SUB_SYNTH: 'Sub synth',
  OSCILLATOR: 'Oscillator'
}

class SubSynth extends React.Component {
  /** @type {Synth.Props} */
  static defaultProps = {
    oscillatorType: 'square',
    wavelength: 50,
    i18n: defaultI18n
  }

  onSelectOscillator = onSelectOscillator.bind(this)
  onChangeWavelength = onChangeWavelength.bind(this)

  render () {
    logger.debug('SubSynth: rendering')

    return (
      <section className='subsynth'>
        <h2>{this.props.i18n.SUB_SYNTH}</h2>
        <section className='oscillator-controls'>
          <h3>{this.props.i18n.OSCILLATOR}</h3>

          <WavelengthRange
            onChange={this.onChangeWavelength}
            value={this.props.wavelength} />

          <OscillatorSelect
            onChange={this.onSelectOscillator}
            value={this.props.oscillatorType} />

        </section>
      </section>
    )
  }
}

function onSelectOscillator (event, oscillatorType) {
  logger.debug(`SubSynth: ${oscillatorType} oscillator selected`)

  this.setState({oscillatorType})
}

function onChangeWavelength (event, wavelength) {
  logger.debug(`SubSynth: wavelength distance now ${wavelength}`)

  this.setState({wavelength})
}

// Having this at this level, is it a good thing?
export default connect(state => ({
  oscillatorType: state.oscillatorType,
  wavelength: state.wavelength
}), { oscillatorChanged, wavelengthChanged })(SubSynth)
