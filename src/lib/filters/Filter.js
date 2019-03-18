// var filter = context.createBiquadFilter(); filter.type = 3; // In this case it's a lowshelf filter filter.frequency.value = 440; filter.Q.value = 0; filter.gain.value = 0;

/**
 * Facades the Web Audio API
 */
class Filter {
  /**
   *
   * @param {Synth.Filter.Props} props
   */
  constructor (props) {
    const {
      type = Filter.LOW_PASS,
      frequency = 100,
      gain = 25,
      quality = 100,
      detune = 0,
      audioContext = new AudioContext()
    } = props

    // Unlike the oscillator, the filter is not killed every time it stops playing
    this.filter = this.audioContext.createBiquadFilter()

    /** @type {Synth.Filter.Type} */
    this.type = type
    /** @type {Synth.Filter.Frequency} */
    this.frequency = frequency
    /** @type {Synth.Filter.Gain} */
    this.gain = gain
    /** @type {Synth.Filter.Quality} */
    this.quality = quality
    /** @type {Synth.Filter.Detune} */
    this.detune = detune

    /** @type {AudioContext} */
    this.audioContext = audioContext
  }

  set connection (output) {
    // @todo extract the connection
    this.filter.connect(output)
  }

  /**
   *
   * @param {Synth.Filter.Type} type
   */
  set type (type) {
    if (this.filter) this.filter.type = type
  }

  /**
   *
   * @param {Synth.Filter.Frequency} frequency
   */
  updateFrequency (frequency) {
    this.frequency = frequency

    if (this.filter) {
      this.filter.frequency.setValueAtTime(
        this.frequency,
        this.audioContext.currentTime
      )
    }
  }

  /**
   *
   * @param {Synth.Filter.Gain} gain
   */
  updateGain (gain) {
    if (this.filter) {
      this.filter.gain.setValueAtTime(
        gain,
        this.audioContext.currentTime
      )
    }
  }

  /**
   *
   * @param {Synth.Filter.Quality} quality
   */
  updateQuality (quality) {
    if (this.filter) {
      this.filter.Q.value = quality;
    }
  }

  /**
   *
   * @param {Synth.Filter.Detune} detune
   */
  updateDetune (detune) {
    if (this.filter) {
      this.filter.detune.value = detune;
    }
  }
}

/** @type {Synth.Filter.Type} */
Filter.LOW_PASS = 'lowpass'
/** @type {Synth.Filter.Type} */
Filter.HIGH_PASS = 'highpass'
/** @type {Synth.Filter.Type} */
Filter.BAND_PASS = 'lowshelf'
/** @type {Synth.Filter.Type} */
Filter.LOW_SHELF = 'highshelf'
/** @type {Synth.Filter.Type} */
Filter.PEAKING = 'peaking'
/** @type {Synth.Filter.Type} */
Filter.NOTCH = 'notch'
/** @type {Synth.Filter.Type} */
Filter.ALL_PASS = 'allpass'

export default Filter
