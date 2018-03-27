import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import FrequencyRange from '../inputs/FrequencyRange'

import { synthUpdate, synthDelete } from '../../state/synths/actions'

import Oscillator from '../../lib/oscillators/Oscillator'

import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  SUB_SYNTH: 'Sub synth',
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove synth',
  PLAY: 'Play',
  STOP: 'Stop'
}

class SubSynth extends React.PureComponent {
  /** @type {Synth.Props} */
  static defaultProps = {
    id: null,
    oscillatorType: 'square',
    frequency: 100,
    i18n: defaultI18n
  }

  constructor (props) {
    super(props)

    this.oscillator = new Oscillator({
      type: this.props.oscillatorType,
      frequency: this.props.frequency
    })
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  onOscillatorChange = event => {
    this.oscillator.updateType(event.target.value)
    this.props.onSynthUpdated({id: this.props.id, oscillatorType: event.target.value})
  }

  onFrequencyChanged = event => {
    this.oscillator.updateFrequency(event.target.value)
    this.props.onSynthUpdated({id: this.props.id, frequency: event.target.value})
  }

  onRemove = () => {
    this.oscillator.kill()
    this.oscillator = null

    this.props.onSynthRemoved({id: this.props.id})
  }

  onPlay = () => {
    this.oscillator.play()
  }

  onStop = () => {
    this.oscillator.stop()
  }

  render () {
    logger.debug(this.props, 'SubSynth.render')

    return (
      <section className='subsynth'>
        <h2>{this.i18n.SUB_SYNTH}</h2>

        <button onClick={this.onRemove}>{this.i18n.REMOVE}</button>

        <section className='oscillator-controls'>
          <h3>{this.i18n.OSCILLATOR}</h3>

          <OscillatorSelect
            onChange={this.onOscillatorChange}
            value={this.props.oscillatorType}
          />

          <FrequencyRange
            onChange={this.onFrequencyChanged}
            value={this.props.frequency}
          />
        </section>

        <button onClick={this.onPlay}>{this.i18n.PLAY}</button>
        <button onClick={this.onStop}>{this.i18n.STOP}</button>

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
