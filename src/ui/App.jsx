import React from 'react'
import { connect } from 'react-redux'
import { synthCreate } from '../state/synths/actions'
import SubSynth from './synths/SubSynth'
import logger from '../lib/logger'

export class App extends React.PureComponent {
  static defaultProps = {
    synths: []
  }

  get synths () {
    return !!this.props.synths.length && this.props.synths.map(synth => (
      <SubSynth key={synth.id} {...synth} />
    ))
  }

  render () {
    logger.debug('App.render')

    return (
      <section>
        <button onClick={this.props.synthCreate}>Create synth</button>

        {this.synths}
      </section>
    )
  }
}

export default connect(mapStateToProps, { synthCreate })(App)

function mapStateToProps (state) {
  logger.debug(state, 'App.mapStateToProps')

  return {
    synths: state.synths
  }
}
