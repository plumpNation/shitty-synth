import React from 'react'
import { connect } from 'react-redux'
import * as oscActions from '../state/oscillators/actions'
import Oscillator from './oscillators/Oscillator'
import logger from '../lib/logger'

export class App extends React.PureComponent {
  static defaultProps = {
    oscillators: []
  }

  get oscillators () {
    return !!this.props.oscillators.length && this.props.oscillators.map(oscillator => (
      <Oscillator key={oscillator.id} {...oscillator} />
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

export default connect(mapStateToProps, { oscillatorCreate: oscActions.create })(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    oscillators: state.oscillators
  }
}
