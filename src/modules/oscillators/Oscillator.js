class Oscillator {
  constructor (type) {
    if (!available) {
      throw new Error('AudioContext unavailable in this browser')
    }

    this.type = type
    this.oscillator = create()
  }
}

function create (scope) {
  const audioContext = new scope.AudioContext()
  const oscillator = audioContext.createOscillator()

  return oscillator
}

function available (scope) {
  return !!scope.AudioContext
}

export default Oscillator
