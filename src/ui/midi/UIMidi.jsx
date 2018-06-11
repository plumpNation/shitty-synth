import React from 'react'
import { connect } from 'react-redux'
import logger from '../../lib/logger'
// import MidiActions from '../../state/midi/actions'

const defaultI18n = {
  DEVICE: 'device',
  DEVICES: 'devices'
}

export class UIMidi extends React.PureComponent {
  /** @type {Synth.UIMidi.Props} */
  static defaultProps = {
    devices: []
  }

  /**
   * @returns {Synth.I18n}
   */
  get i18n () {
    return {...defaultI18n, ...this.props.i18n}
  }

  get deviceString () {
    return this.props.devices.length === 1 ? this.i18n.DEVICE : this.i18n.DEVICES
  }

  /**
   * @returns {number}
   */
  get deviceCount () {
    return (Array.isArray(this.props.midi.devices) && this.props.devices.length) || 0
  }

  render () {
    logger.debug('UIMidi.render')

    return (
      <section className='midi'>
        <div className='midi__device-count'>
          {this.props.devices.length} {this.i18n.DEVICES}
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(UIMidi)

function mapStateToProps (state) {
  logger.warn(state, 'UIMidi.mapStateToProps')

  return {...state.midi}
}

function mapDispatchToProps () {
  // logger.debug('UIMidi.mapDispatchToProps')

  return {}
}
