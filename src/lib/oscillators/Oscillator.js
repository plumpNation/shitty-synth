class Oscillator {
  /**
   *
   * @param {Synth.OscillatorProps} props
   */
  constructor (props) {
    const {type = 'square', frequency = 100} = props

    if (!available()) {
      throw new Error('AudioContext unavailable in this browser')
    }

    this.type = type
    this.frequency = frequency
    this.audioContext = new AudioContext()
  }

  play () {
    this.oscillator = createOscillator(this.audioContext, this.type, this.frequency)
    this.oscillator.start()
  }

  stop () {
    this.oscillator.stop()
  }

  updateType (type) {
    this.type = type
    this.oscillator.type = type
  }

  updateFrequency (frequency) {
    this.frequency = frequency
    this.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime)
  }
}

/**
 * @param {AudioContext} audioContext
 * @param {OscillatorType} type
 * @param {Synth.Wavelength} frequency
 * @returns {OscillatorNode}
 */
function createOscillator (audioContext, type, frequency) {
  const oscillator = audioContext.createOscillator()

  oscillator.connect(audioContext.destination)

  oscillator.type = type

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime) // value in hertz

  return oscillator
}

/**
 * @returns {boolean}
 */
function available () {
  return !!window.AudioContext
}

export default Oscillator
