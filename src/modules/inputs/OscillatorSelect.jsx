import React from 'react'
import logger from '../../lib/logger'

class OscillatorSelect extends React.Component {
  /** @type {Synth.OscillatorSelectProps} */
  static defaultProps = {
    value: 'square'
  }

  constructor (props) {
    super(props)

    /** @type {Synth.OscillatorSelectState} */
    this.state = {
      value: props.value
    }
  }

  setWaveType (e) {
    const value = e.target.value

    logger.debug('OscillatorSelect: setting type ' + value)

    this.setState({value})
  }

  render () {
    logger.debug('OscillatorSelect: rendering')

    return (
      <label>
        <span>Type: {this.state.value}</span>
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
