import React from 'react'
import { connect } from 'react-redux'
import * as oscActions from '../state/oscillators/actions'
import Oscillator from './oscillators/Oscillator'
import logger from '../lib/logger'

export class App extends React.PureComponent {
  static defaultProps = {
    synths: []
  }

  get synths () {
    return !!this.props.synths.length && this.props.synths.map(synth => (
      <Oscillator key={synth.id} {...synth} />
    ))
  }

  render () {
    logger.debug('App.render')

    return (
      <section>
        <button onClick={this.props.oscillatorCreate}>Create oscillator</button>

        {this.synths}
      </section>
    )
  }
}

export default connect(mapStateToProps, { oscillatorCreate: oscActions.create })(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    synths: state.synths
  }
}
