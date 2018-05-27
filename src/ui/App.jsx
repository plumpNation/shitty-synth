import React from 'react'
import { connect } from 'react-redux'
import transportActions from '../state/transport/actions'
import oscillatorActions from '../state/oscillators/actions'
import OscillatorModule from './modules/oscillator/OscillatorModule'
import logger from '../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  PLAY: 'Play',
  STOP: 'Stop',
  ADD_OSCILLATOR: 'Add oscillator'
}

export class App extends React.PureComponent {
  static defaultProps = {
    oscillators: [],
    i18n: defaultI18n
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  get oscillators () {
    return (
      <section className='oscillators'>
        <button onClick={this.props.oscillatorAdd}>
          {this.i18n.ADD_OSCILLATOR}
        </button>
        {this.props.oscillators.map(oscillator => (
          <OscillatorModule key={oscillator.id} {...oscillator} />
        ))}
      </section>
    )
  }

  get transport () {
    return (
      <section className='transport'>
        {this.props.transport.isPlaying &&
          <button onClick={this.props.transportStop}>{this.i18n.STOP}</button>}
        {!this.props.transport.isPlaying &&
          <button onClick={this.props.transportPlay}>{this.i18n.PLAY}</button>}
      </section>
    )
  }

  render () {
    logger.debug('App.render')

    return (
      <section>
        {this.transport}
        {this.oscillators}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    oscillators: state.oscillators,
    transport: state.transport
  }
}

function mapDispatchToProps () {
  logger.debug('App.mapDispatchToProps')

  return {
    oscillatorAdd: oscillatorActions.add,
    transportPlay: transportActions.play,
    transportStop: transportActions.stop
  }
}
