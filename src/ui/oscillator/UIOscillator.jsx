import React from 'react'
import {connect} from 'react-redux'

import UIWaveTypeInput from './UIWaveTypeInput'
import UIFrequencyInput from './UIFrequencyRangeInput'

import oscillatorActions from '../../state/oscillators/actions'

import logger from '../../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  OSCILLATOR: 'Oscillator',
  REMOVE: 'Remove',
  ACTIVE: 'Active'
}

class UIOscillator extends React.PureComponent {
  /** @type {Synth.UIOscillator.Props} */
  static defaultProps = {
    id: undefined,
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
        <UIWaveTypeInput
          onChange={this.updateType}
          value={this.props.type}
        />

        <UIFrequencyInput
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

export default connect(mapStateToProps, mapDispatchToProps())(UIOscillator)

function mapStateToProps (state) {
  logger.debug(state, 'UIOscillator.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}

function mapDispatchToProps () {
  logger.debug('UIOscillator.mapDispatchToProps')

  return {
    onUpdated: oscillatorActions.update,
    onRemoved: oscillatorActions.remove
  }
}
