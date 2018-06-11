import React from 'react'
import { connect } from 'react-redux'
import oscillatorActions from '../state/oscillators/actions'
import UIOscillator from './oscillator/UIOscillator'
import UITransport from './transport/UITransport'
import logger from '../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  ADD_OSCILLATOR: 'Add oscillator'
}

const synthStyle = {
  padding: '1rem'
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
          <UIOscillator key={oscillator.id} {...oscillator} />
        ))}
      </section>
    )
  }

  render () {
    logger.debug('App.render')

    return (
      <section className='synth' style={synthStyle}>
        <UITransport />
        {this.oscillators}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}

function mapDispatchToProps () {
  logger.debug('App.mapDispatchToProps')

  return {
    oscillatorAdd: oscillatorActions.add
  }
}
