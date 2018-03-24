import React from 'react'
import logger from '../../lib/logger'

class OscillatorSelect extends React.Component {
  /** @type {Synth.OscillatorSelectProps} */
  static defaultProps = {
    type: 'square'
  }

  constructor (props) {
    super(props)

    /** @type {Synth.OscillatorSelectState} */
    this.state = {
      type: props.type
    }
  }

  setWaveType (e) {
    const type = e.target.value

    logger.debug('OscillatorSelect: setting type ' + type)

    this.setState({type})
  }

  render () {
    logger.debug('OscillatorSelect: rendering')

    return (
      <label>
        <span>Type: {this.state.type}</span>
        <select className='wave-type' onChange={event => this.setWaveType(event)}>
          <option value='square'>Square</option>
          <option value='saw'>Saw</option>
          <option value='round'>Round</option>
        </select>
      </label>
    )
  }
}

export default OscillatorSelect
