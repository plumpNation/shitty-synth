import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WavelengthRange from '../inputs/WavelengthRange'
import {oscillatorChanged, wavelengthChanged} from '../synths/synthActions'

import logger from '../../lib/logger'

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

  render () {
    logger.debug('SubSynth: rendering')

    return (
      <section className='subsynth'>
        <h2>{this.props.i18n.SUB_SYNTH}</h2>
        <section className='oscillator-controls'>
          <h3>{this.props.i18n.OSCILLATOR}</h3>

          <OscillatorSelect
            onChange={this.props.onOscillatorChanged}
            value={this.props.oscillatorType} />

          <WavelengthRange
            onChange={this.props.onWavelengthChanged}
            value={this.props.wavelength} />

        </section>
      </section>
    )
  }
}

// Having this at this level, is it a good thing?
export default connect(mapStateToProps, mapDispatchToProps)(SubSynth)

function mapStateToProps (state) {
  logger.debug('SubSynth: mapping state to props')

  return {
    oscillatorType: state.oscillatorType,
    wavelength: state.wavelength
  }
}

function mapDispatchToProps (dispatch) {
  logger.debug('SubSynth: mapping dispatch events to props')

  return {
    onOscillatorChanged: (event) => {
      dispatch(oscillatorChanged(event.target.value))
    },

    onWavelengthChanged: (event) => {
      dispatch(wavelengthChanged(event.target.value))
    }
  }
}
