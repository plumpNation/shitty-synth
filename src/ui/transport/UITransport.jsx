import React from 'react'
import { connect } from 'react-redux'
import logger from '../../lib/logger'
import transportActions from '../../state/transport/actions'

const defaultI18n = {
  PLAY: 'Play',
  STOP: 'Stop'
}

export class UITransport extends React.PureComponent {
  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  render () {
    logger.debug('UITransport.render')

    return (
      <section className='transport'>
        {this.props.transport.isPlaying &&
          <button onClick={this.props.transportStop}>{this.i18n.STOP}</button>}
        {!this.props.transport.isPlaying &&
          <button onClick={this.props.transportPlay}>{this.i18n.PLAY}</button>}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(UITransport)

function mapStateToProps (state) {
  logger.debug(state, 'UITransport.mapStateToProps')

  return {
    transport: state.transport
  }
}

function mapDispatchToProps () {
  logger.debug('UITransport.mapDispatchToProps')

  return {
    transportPlay: transportActions.play,
    transportStop: transportActions.stop
  }
}
