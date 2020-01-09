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
      connection,
      shape = Oscillator.SQUARE,
      frequency = 100,
      detune = 0,
      audioContext = new AudioContext(),
    } = props

    /** @type {Synth.Oscillator.Shape} */
    this._shape = shape
    /** @type {Synth.Oscillator.Detune} */
    this._detune = detune
    /** @type {Synth.Oscillator.Frequency} */
    this._frequency = frequency
    /** @type {Synth.Oscillator.Connection} */
    this._connection = connection

    /** @type {AudioContext} */
    this.audioContext = audioContext
  }

  play () {
    this.oscillator = this.audioContext.createOscillator()

    // these should be set after the oscillator is created
    this.shape = this._shape
    this.detune = this._detune
    this.frequency = this._frequency

    if (this._connection) {
      this.connection = this._connection
    }

    this.oscillator.start()
  }

  /**
   * @param {Synth.Oscillator.Connection} params
   */
  set connection({output, outputIndex, inputIndex}) {
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

  set shape (shape) {
    this._shape = shape

    if (this.oscillator) this.oscillator.type = shape
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

/** @type {Synth.Oscillator.Shape} */
Oscillator.SINE = 'sine';
/** @type {Synth.Oscillator.Shape} */
Oscillator.SQUARE = 'square';
/** @type {Synth.Oscillator.Shape} */
Oscillator.SAWTOOTH = 'sawtooth';
/** @type {Synth.Oscillator.Shape} */
Oscillator.TRIANGLE = 'triangle';
/** @type {Synth.Oscillator.Shape} */
Oscillator.CUSTOM = 'custom';

export default Oscillator
