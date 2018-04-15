import React from 'react'
import {connect} from 'react-redux'

import OscillatorSelect from '../inputs/OscillatorSelect'
import FrequencyRange from '../inputs/FrequencyRange'

import oscActions from '../../state/oscillators/actions'

import Oscillator from '../../lib/oscillators/Oscillator'

import logger from '../../lib/logger'

/** @type {Synth.Oscillator.I18n} */
const defaultI18n = {
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove',
  PLAY: 'Play',
  STOP: 'Stop'
}

class OscillatorView extends React.PureComponent {
  /** @type {Synth.Oscillator.Props} */
  static defaultProps = {
    id: null,
    type: 'square',
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
   * @returns {Synth.Oscillator.I18n}
   */
  get i18n () {
    return Object.assign({}, defaultI18n, this.props.i18n)
  }

  onOscillatorChange = event => {
    this.oscillator.updateType(event.target.value)
    this.props.onUpdated({id: this.props.id, oscillatorType: event.target.value})
  }

  onFrequencyChanged = event => {
    this.oscillator.updateFrequency(event.target.value)
    this.props.onUpdated({id: this.props.id, frequency: event.target.value})
  }

  onDestroy = () => {
    this.oscillator.kill()
    this.oscillator = null

    this.props.onDestroyed({id: this.props.id})
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
      <section className='oscillator {this.props.oscillatorType}'>
        <h3>{this.i18n.OSCILLATOR}: {this.props.oscillatorType}</h3>

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

        <div className='oscillator-controls'>
          {this.playStopButton()}
          <button onClick={this.onDestroy}>{this.i18n.REMOVE}</button>
        </div>

      </section>
    )
  }
}

export default connect(null, mapDispatchToProps)(OscillatorView)

function mapDispatchToProps (dispatch) {
  logger.debug('Oscillator.mapDispatchToProps')

  return {
    /**
     * @param {Synth.OscillatorAction.UpdatePayload} payload
     */
    onUpdated: payload => {
      dispatch(oscActions.update(payload))
    },

    onDestroyed: payload => {
      dispatch(oscActions.destroy(payload))
    }
  }
}
