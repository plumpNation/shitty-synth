import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import FrequencyRange from '../inputs/FrequencyRange'

import * as oscActions from '../../state/oscillators/actions'

import OSC from '../../lib/oscillators/Oscillator'

import logger from '../../lib/logger'

/** @type {Oscillator.I18n} */
const defaultI18n = {
  SUB_SYNTH: 'Sub synth',
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove synth',
  PLAY: 'Play',
  STOP: 'Stop'
}

class Oscillator extends React.PureComponent {
  /** @type {Oscillator.Props} */
  static defaultProps = {
    id: null,
    type: 'square',
    frequency: 100,
    i18n: defaultI18n
  }

  constructor (props) {
    super(props)

    this.oscillator = new OSC({
      type: this.props.oscillatorType,
      frequency: this.props.frequency
    })
  }

  /**
   * @returns {Oscillator.I18n}
   */
  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  onOscillatorChange = event => {
    this.oscillator.updateType(event.target.value)
    this.props.onOscillatorUpdated({id: this.props.id, oscillatorType: event.target.value})
  }

  onFrequencyChanged = event => {
    this.oscillator.updateFrequency(event.target.value)
    this.props.onOscillatorUpdated({id: this.props.id, frequency: event.target.value})
  }

  onRemove = () => {
    this.oscillator.kill()
    this.oscillator = null

    this.props.onOscillatorRemoved({id: this.props.id})
  }

  onPlay = () => {
    this.setState({isPlaying: true})
    this.oscillator.play()
  }

  onStop = () => {
    this.setState({isPlaying: false})
    this.oscillator.stop()
  }

  playStopButton () {
    return this.state && this.state.isPlaying
      ? <button onClick={this.onStop}>{this.i18n.STOP}</button>
      : <button onClick={this.onPlay}>{this.i18n.PLAY}</button>
  }

  render () {
    logger.debug(this.props, 'Oscillator.render')

    return (
      <section className='oscillator'>
        <h3>{this.props.oscillatorType} {this.i18n.OSCILLATOR}</h3>

        <button onClick={this.onRemove}>{this.i18n.REMOVE}</button>

        <section className='oscillator-controls'>

          <OscillatorSelect
            onChange={this.onOscillatorChange}
            value={this.props.oscillatorType}
          />

          <FrequencyRange
            onChange={this.onFrequencyChanged}
            value={this.props.frequency}
          />
        </section>

        {this.playStopButton()}

      </section>
    )
  }
}

export default connect(null, mapDispatchToProps)(Oscillator)

function mapDispatchToProps (dispatch) {
  logger.debug('Oscillator.mapDispatchToProps')

  return {
    /**
     * @param {OscillatorAction.UpdatePayload} payload
     */
    onOscillatorUpdated: payload => {
      dispatch(oscActions.update(payload))
    },

    onOscillatorRemoved: payload => {
      dispatch(oscActions.destroy(payload))
    }
  }
}
