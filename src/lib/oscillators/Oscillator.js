class Oscillator {
  /**
   *
   * @param {Synth.Oscillator.Props} props
   */
  constructor (props) {
    const {
      type = 'square',
      frequency = 100,
      audioContext = new AudioContext()
    } = props

    this.type = type
    this.frequency = frequency

    /** @type {AudioContext} */
    this.audioContext = audioContext
  }

  play () {
    this.oscillator = createOscillator(this.audioContext, this.type, this.frequency)
    this.oscillator.start()
  }

  stop () {
    this.oscillator && this.oscillator.stop()
  }

  kill () {
    this.oscillator && this.oscillator.stop()
  }

  updateType (type) {
    this.type = type

    if (this.oscillator) this.oscillator.type = type
  }

  updateFrequency (frequency) {
    this.frequency = frequency

    if (this.oscillator) {
      this.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime)
    }
  }
}

/**
 * @param {AudioContext} audioContext
 * @param {Synth.Oscillator.Type} type
 * @param {Synth.Oscillator.Frequency} frequency
 * @returns {OscillatorNode}
 */
function createOscillator (audioContext, type, frequency) {
  const oscillator = audioContext.createOscillator()

  oscillator.connect(audioContext.destination)

  oscillator.type = type

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime) // value in hertz

  return oscillator
}

export default Oscillator
