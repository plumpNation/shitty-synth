import React from 'react'
import { connect } from 'react-redux'
import oscillatorActions from '../state/oscillators/actions'
import OscillatorModule from './oscillators/OscillatorModule'
import logger from '../lib/logger'

export class App extends React.PureComponent {
  static defaultProps = {
    oscillators: []
  }

  get oscillators () {
    if (!this.props.oscillators.length) {
      return
    }

    return this.props.oscillators.map(oscillator => (
      <OscillatorModule key={oscillator.id} {...oscillator} />
    ))
  }

  render () {
    logger.debug('App.render')

    return (
      <section>
        <button onClick={this.props.oscillatorCreate}>Create oscillator</button>

        {this.oscillators}
      </section>
    )
  }
}

export default connect(mapStateToProps, {
  oscillatorCreate: oscillatorActions.create
})(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}
