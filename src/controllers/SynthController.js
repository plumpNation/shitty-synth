import Oscillator from '../lib/oscillators/Oscillator'

class SynthController {
  constructor (props) {
    this.props = props

    this.oscillator = new Oscillator()
  }

  set oscillator (oscillator) {
    this.oscillator = oscillator
  }
}

export default SynthController
