import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import logger from '../../lib/logger'
import TransportActions from '../../state/transport/actions'

const defaultI18n = {
  PLAY: 'Play',
  STOP: 'Stop'
}

export class TransportInput extends PureComponent {
  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  render () {
    logger.debug('Transport.render')

    return (
      <section className='transport'>
        {this.props.isPlaying &&
          <button onClick={this.props.dispatchStop}>{this.i18n.STOP}</button>}
        {!this.props.isPlaying &&
          <button onClick={this.props.dispatchPlay}>{this.i18n.PLAY}</button>}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(TransportInput)

function mapStateToProps (state) {
  logger.debug(state, 'Transport.mapStateToProps')

  return {...state.transport}
}

function mapDispatchToProps () {
  logger.debug('Transport.mapDispatchToProps')

  return {
    dispatchPlay: TransportActions.play,
    dispatchStop: TransportActions.stop
  }
}
