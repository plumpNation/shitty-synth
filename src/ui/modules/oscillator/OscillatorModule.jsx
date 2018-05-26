import React from 'react'
import {connect} from 'react-redux'

import TypeSelector from './TypeSelector'
import FrequencyRange from './FrequencyRange'

import oscillatorActions from '../../../state/oscillators/actions'

import Oscillator from '../../../lib/oscillators/Oscillator'

import logger from '../../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove',
  PLAY: 'Play',
  STOP: 'Stop'
}

class OscillatorModule extends React.PureComponent {
  /** @type {Synth.OscillatorModule.State} */
  static defaultProps = {
    id: null,
    type: 'square',
    frequency: 100,
    i18n: defaultI18n
  }

  constructor (props) {
    super(props)

    this.oscillator = new Oscillator({
      type: this.props.type,
      frequency: this.props.frequency
    })
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  updateType = event => {
    this.oscillator.updateType(event.target.value)
    this.props.onUpdated({id: this.props.id, type: event.target.value})
  }

  updateFrequency = event => {
    this.oscillator.updateFrequency(event.target.value)
    this.props.onUpdated({id: this.props.id, frequency: event.target.value})
  }

  remove = () => {
    this.oscillator.kill()
    this.oscillator = null

    this.props.onRemoved({id: this.props.id})
  }

  play = () => {
    this.setState({isPlaying: true})
    this.oscillator.play()
  }

  stop = () => {
    this.setState({isPlaying: false})
    this.oscillator.stop()
  }

  transport () {
    return (
      <div className='oscillator-transport'>
        {this.state && this.state.isPlaying
          ? <button onClick={this.stop}>{this.i18n.STOP}</button>
          : <button onClick={this.play}>{this.i18n.PLAY}</button>}
        <button onClick={this.remove}>{this.i18n.REMOVE}</button>
      </div>
    )
  }

  controls () {
    return (
      <section className='oscillator-controls'>
        <TypeSelector
          onChange={this.updateType}
          value={this.props.type}
        />

        <FrequencyRange
          onChange={this.updateFrequency}
          value={this.props.frequency}
        />
      </section>
    )
  }

  render () {
    logger.debug(this.props, 'Oscillator.render')

    return (
      <section className='oscillator {this.props.type}'>
        <h3>{this.i18n.OSCILLATOR}: {this.props.type}</h3>
        {this.controls()}
        {this.transport()}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OscillatorModule)

function mapStateToProps (state) {
  logger.debug(state, 'OscillatorModule.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}

function mapDispatchToProps (dispatch) {
  logger.debug('OscillatorModule.mapDispatchToProps')

  return {
    /**
     * @param {Synth.OscillatorModule.State} payload
     */
    onUpdated: payload => {
      dispatch(oscillatorActions.update(payload))
    },

    onRemoved: payload => {
      dispatch(oscillatorActions.remove(payload))
    }
  }
}
