/**
 * Facades the Web Audio API
 */
class Oscillator {
  /**
   *
   * @param {Synth.Oscillator.Props} props
   */
  constructor (props) {
    const {
      type = Oscillator.SQUARE,
      frequency = 100,
      detune = 0,
      connection = {},
      audioContext = new AudioContext()
    } = props

    /** @type {Synth.Oscillator.Type} */
    this._type = type
    /** @type {Synth.Oscillator.Detune} */
    this._detune = detune
    /** @type {Synth.Oscillator.Frequency} */
    this._frequency = frequency
    /** @type {Synth.Connection.Object} */
    this._connection = connection

    /** @type {AudioContext} */
    this.audioContext = audioContext
  }

  play () {
    this.oscillator = this.audioContext.createOscillator()

    // these should be set after the oscillator is created
    this.type = this._type
    this.detune = this._detune
    this.frequency = this._frequency

    if (this._connection) {
      this.setConnection(this._connection)
    }

    this.oscillator.start()
  }

  /**
   * @param {Synth.Connection.Object} params
   */
  setConnection({output, outputIndex, inputIndex}) {
    this.oscillator.connect(output, outputIndex, inputIndex)
  }

  stop () {
    this.oscillator && this.oscillator.stop()
  }

  kill () {
    this.oscillator && this.oscillator.stop()
  }

  set detune (detune) {
    this._detune = detune

    if (this.oscillator) this.oscillator.detune.value = detune
  }

  set type (type) {
    this._type = type

    if (this.oscillator) this.oscillator.type = type
  }

  set frequency (frequency) {
    this._frequency = frequency

    if (this.oscillator) {
      this.oscillator.frequency.setValueAtTime(
        frequency,
        this.audioContext.currentTime
      )
    }
  }
}

/** @type {Synth.Oscillator.Type} */
Oscillator.SINE = 'sine';
/** @type {Synth.Oscillator.Type} */
Oscillator.SQUARE = 'square';
/** @type {Synth.Oscillator.Type} */
Oscillator.SAWTOOTH = 'sawtooth';
/** @type {Synth.Oscillator.Type} */
Oscillator.TRIANGLE = 'triangle';
/** @type {Synth.Oscillator.Type} */
Oscillator.CUSTOM = 'custom';

export default Oscillator
