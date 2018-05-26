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
  PLAYING: 'Playing'
}

class OscillatorModule extends React.PureComponent {
  /** @type {Synth.OscillatorModule.State} */
  static defaultProps = {
    id: null,
    type: 'square',
    frequency: 100,
    i18n: defaultI18n,
    isPlaying: false
  }

  constructor (props) {
    super(props)

    // @todo - this should not be in here. Move it up to the controller.
    this.oscillator = new Oscillator({
      type: this.props.type,
      frequency: this.props.frequency
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.isPlaying) {
      !prevProps.isPlaying && this.oscillator.play()
    } else {
      this.oscillator.stop()
    }
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

  transport () {
    return (
      <div className='oscillator-transport'>
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
        <p>{this.props.isPlaying && this.i18n.PLAYING}</p>
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

export default connect(mapStateToProps, mapDispatchToProps())(OscillatorModule)

function mapStateToProps (state) {
  logger.debug(state, 'OscillatorModule.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}

function mapDispatchToProps () {
  logger.debug('OscillatorModule.mapDispatchToProps')

  return {
    onUpdated: oscillatorActions.update,
    onRemoved: oscillatorActions.remove
  }
}
