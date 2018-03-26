import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import WavelengthRange from '../inputs/WavelengthRange'

import { synthUpdate, synthDelete } from '../../state/synths/actions'

import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  SUB_SYNTH: 'Sub synth',
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove synth'
}

class SubSynth extends React.PureComponent {
  /** @type {Synth.Props} */
  static defaultProps = {
    id: null,
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

  onOscillatorChange = event => {
    this.props.onSynthUpdated({id: this.props.id, oscillatorType: event.target.value})
  }

  onWavelengthChanged = event => {
    this.props.onSynthUpdated({id: this.props.id, wavelength: event.target.value})
  }

  onRemove = event => {
    this.props.onSynthRemoved({id: this.props.id})
  }

  render () {
    logger.debug(this.props, 'SubSynth.render')

    return (
      <section className='subsynth'>
        <h2>{this.i18n.SUB_SYNTH}</h2>
        <section className='oscillator-controls'>
          <h3>{this.i18n.OSCILLATOR}</h3>

          <OscillatorSelect
            onChange={this.onOscillatorChange}
            value={this.props.oscillatorType}
          />

          <WavelengthRange
            onChange={this.onWavelengthChanged}
            value={this.props.wavelength}
          />
        </section>

        <button onClick={this.onRemove}>{this.i18n.REMOVE}</button>
      </section>
    )
  }
}

export default connect(null, mapDispatchToProps)(SubSynth)

function mapDispatchToProps (dispatch) {
  logger.debug('SubSynth.mapDispatchToProps')

  return {
    /**
     * @param {SynthAction.UpdatePayload} payload
     */
    onSynthUpdated: payload => {
      dispatch(synthUpdate(payload))
    },

    onSynthRemoved: payload => {
      dispatch(synthDelete(payload))
    }
  }
}
