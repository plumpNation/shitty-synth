import React from 'react'
import { connect } from 'react-redux'
import oscillatorActions from '../state/oscillators/actions'
import filterActions from '../state/filters/actions'
import UIOscillator from './oscillator/UIOscillator'
import UITransport from './transport/UITransport'
import UIFilter from './filter/UIFilter'
import UIMidi from './midi/UIMidi'
import logger from '../lib/logger'

/** @type {Synth.I18n} */
const defaultI18n = {
  ADD_OSCILLATOR: 'Add oscillator',
  ADD_FILTER: 'Add filter'
}

const synthStyle = {
  padding: '1rem'
}

export class App extends React.PureComponent {
  static defaultProps = {
    oscillators: [],
    filters: [],
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

  get filters () {
    return (
      <section className='filters'>
        <button onClick={this.props.filterAdd}>
          {this.i18n.ADD_FILTER}
        </button>
        {this.props.filters.map(filter => (
          <UIFilter key={filter.id} {...filter} />
        ))}
      </section>
    )
  }

  render () {
    logger.debug('App.render')

    return (
      <section className='synth' style={synthStyle}>
        <UITransport />
        {this.filters}
        {this.oscillators}
        <UIMidi />
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    oscillators: state.oscillators,
    filters: state.filters
  }
}

function mapDispatchToProps () {
  logger.debug('App.mapDispatchToProps')

  return {
    oscillatorAdd: oscillatorActions.add,
    filterAdd: filterActions.add
  }
}
