import React from 'react'
import {connect} from 'react-redux'

import TypeSelector from './TypeSelector'
import FrequencyRange from './FrequencyRange'

import oscillatorActions from '../../../state/oscillators/actions'

import logger from '../../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove',
  ACTIVE: 'Active'
}

class OscillatorModule extends React.PureComponent {
  /** @type {Synth.OscillatorModule.State} */
  static defaultProps = {
    id: null,
    type: 'square',
    frequency: 100,
    i18n: defaultI18n,
    isActive: false
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  updateType = event => {
    this.props.onUpdated({id: this.props.id, type: event.target.value})
  }

  updateFrequency = event => {
    this.props.onUpdated({id: this.props.id, frequency: event.target.value})
  }

  remove = () => {
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
        <p>{this.props.isActive && this.i18n.ACTIVE}</p>
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
