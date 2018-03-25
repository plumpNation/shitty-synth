import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WavelengthRange from '../inputs/WavelengthRange'
import {oscillatorChanged, wavelengthChanged} from '../synths/synthActions'

import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  SUB_SYNTH: 'Sub synth',
  OSCILLATOR: 'Oscillator'
}

class SubSynth extends React.PureComponent {
  /** @type {Synth.Props} */
  static defaultProps = {
    oscillatorType: 'square',
    wavelength: 50,
    i18n: defaultI18n
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  render () {
    logger.debug('SubSynth.render')

    return (
      <section className='subsynth'>
        <h2>{this.i18n.SUB_SYNTH}</h2>
        <section className='oscillator-controls'>
          <h3>{this.i18n.OSCILLATOR}</h3>

          <OscillatorSelect
            onChange={this.props.onOscillatorChanged}
            value={this.props.oscillatorType}
          />

          <WavelengthRange
            onChange={this.props.onWavelengthChanged}
            value={this.props.wavelength}
          />

        </section>
      </section>
    )
  }
}

// Having this at this level, is it a good thing?
export default connect(mapStateToProps, mapDispatchToProps)(SubSynth)

function mapStateToProps (state) {
  logger.debug(state.synth, 'SubSynth.mapStateToProps')

  return {
    oscillatorType: state.synth.oscillatorType,
    wavelength: state.synth.wavelength
  }
}

function mapDispatchToProps (dispatch) {
  logger.debug('SubSynth.mapDispatchToProps')

  return {
    onOscillatorChanged: (event) => {
      dispatch(oscillatorChanged(event.target.value))
    },

    onWavelengthChanged: (event) => {
      dispatch(wavelengthChanged(event.target.value))
    }
  }
}
