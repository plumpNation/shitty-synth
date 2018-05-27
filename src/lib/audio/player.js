import Oscillator from '../oscillators/Oscillator'

import TransportActions from '../../state/transport/actions'
import OscillatorActions from '../../state/oscillators/actions'

// Stores the actual audio oscillators
// Maybe this could be done better with React somehow?
// Could look into redux saga?
const oscillatorsT = {}

/**
 *
 * @param {Synth.State} state
 */
function updateAudio (state) {
  const {
    action,
    payload,
    oscillators,
    transport
  } = state

  // handle creation of new oscillators
  if (action === OscillatorActions.ADD || action === 'persist/REHYDRATE') {
    oscillators.forEach(oscillator => {
      const {id, type, frequency} = oscillator

      if (oscillatorsT[id]) {
        return
      }

      oscillatorsT[id] = new Oscillator({type, frequency})

      if (transport.isPlaying) {
        oscillatorsT[id].play()
        oscillatorsT[id].isPlaying = true
      }
    })
  }

  if (action === OscillatorActions.UPDATE) {
    const {id} = payload

    payload.type && oscillatorsT[id].updateType(payload.type)
    payload.frequency && oscillatorsT[id].updateFrequency(payload.frequency)
  }

  // Handle removal of oscillators
  const oscillatorIds = oscillators.map(oscillator => oscillator.id)

  Object.keys(oscillatorsT).forEach(id => {
    if (action === OscillatorActions.REMOVE) {
      if (oscillatorIds.indexOf(parseInt(id, 10)) < 0) {
        oscillatorsT[id].kill()

        delete oscillatorsT[id]
      }
    }

    // I've exposed the action on the state so we can utilise it in this
    // more vanilla section of the codebase.
    if ([TransportActions.PLAY, TransportActions.STOP].indexOf(action) > -1) {
      if (transport.isPlaying) {
        !oscillatorsT[id].isPlaying && oscillatorsT[id].play()
        // We want this to be idempotent, so we leave a flag on the oscillator
        // so we can avoid playing twice.
        oscillatorsT[id].isPlaying = true
      } else {
        oscillatorsT[id].isPlaying && oscillatorsT[id].stop()
        oscillatorsT[id].isPlaying = false
      }
    }
  })
}

// AUDIO
export function createAudioPlayer (store) {
  const unsubscribe = store.subscribe(() => {
    updateAudio(store.getState())
  })

  return unsubscribe
}
