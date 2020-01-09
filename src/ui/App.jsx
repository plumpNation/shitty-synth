import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import oscillatorActions from '../state/oscillators/actions'
import filterActions from '../state/filters/actions'
import OscillatorsInput from './oscillator/OscillatorsInput'
import TransportInput from './transport/TransportInput'
import FilterInput from './filter/FilterInput'
// import MidiInput from './midi/MidiInput'
import logger from '../lib/logger'
import Oscillator from '../lib/oscillators/Oscillator';
import Filter from '../lib/filters/Filter'

/** @type {Synth.I18n} */
const defaultI18n = {
  ADD_OSCILLATOR: 'Add oscillator',
  ADD_FILTER: 'Add filter'
}

const synthStyle = {
  padding: '1rem'
}

export class App extends PureComponent {
  /** @type {{ oscillators: Oscillator[], filters: Filter[], i18n: Synth.I18n }} */
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
    const { oscillators } = this.props;

    return (
      <section className='oscillators'>
        <button onClick={this.props.oscillatorAdd}>
          {this.i18n.ADD_OSCILLATOR}
        </button>
        {oscillators.map(oscillator => (
          <OscillatorsInput
            key={oscillator.id}
            frequency={oscillator.frequency}
            shape={oscillator.shape}
          />
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
          <FilterInput key={filter.id} {...filter} />
        ))}
      </section>
    )
  }

  render () {
    logger.debug('App.render')

    return (
      <section className='synth' style={synthStyle}>
        <TransportInput />
        {this.filters}
        {this.oscillators}
        {/* <MidiInput /> */}
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
