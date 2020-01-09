/**
 * The manager reacts to the update of the redux store. All functionality
 * in this manager should be idempotent, and should be able to handle multiple
 * store updates where some properties do not change. The manager should
 * recognize that the property is unchanged and not re-run the pertinent
 * functionality, rather allow it to simply continue.
 */

import Oscillator from '../oscillators/Oscillator'
// import Filter from '../filters/Filter'

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
function update (state) {
  const {
    action,
    payload,
    oscillators,
    transport
  } = state

  // handle creation of new oscillators
  // `persist/REHYDRATE` is an action dispatched by the redux-persist module
  if (action === OscillatorActions.ADD ||
    action === TransportActions.PLAY ||
    action === 'persist/REHYDRATE') {
    if (transport.isPlaying) {
      oscillators.forEach(oscillator => {
        const id = createIfNotExists(oscillator)

        oscillatorsT[id].play()
      })
    };
  }

  if (action === OscillatorActions.UPDATE) {
    const {id} = payload

    if (payload.type) oscillatorsT[id].type = payload.type
    if (payload.frequency) oscillatorsT[id].frequency = payload.frequency
  }

  // Handle removal of oscillators
  const oscillatorIds = oscillators.map(oscillator => oscillator.id)

  Object.keys(oscillatorsT).forEach(id => {
    if (action === OscillatorActions.REMOVE) {
      filterOscillators(id, oscillatorIds);
    }

    // I've exposed the action on the state so we can utilise it in this
    // more vanilla section of the codebase.
    if ([TransportActions.PLAY, TransportActions.STOP].indexOf(action) > -1) {
      if (transport.isPlaying) {
        oscillatorsT[id].play()
      } else {
        oscillatorsT[id].stop()
      }
    }
  })
}

// AUDIO
export function init (store) {
  const unsubscribe = store.subscribe(() => {
    update(store.getState())
  })

  return unsubscribe
}

/**
 * @returns {boolean}
 */
function webAudioAvailable () {
  try {
    return !!AudioContext
  } catch (err) {
    return false
  }
}

/**
 * @param {Synth.Oscillator.State} oscillator
 */
function createIfNotExists(oscillator) {
  const {id, shape, frequency} = oscillator

  if (oscillatorsT[id]) {
    return
  }

  if (!webAudioAvailable()) {
    throw new Error('AudioContext unavailable in this browser')
  }

  const audioContext = new AudioContext()

  oscillatorsT[id] = new Oscillator({shape, frequency, audioContext})

  return id;
}

/**
 * Remove all oscillators not found in the supplied array
 *
 * @param {string} id
 * @param {number[]} oscillatorIds
 */
function filterOscillators(id, oscillatorIds) {
  if (oscillatorIds.indexOf(parseInt(id, 10)) < 0) {
    oscillatorsT[id].kill()

    delete oscillatorsT[id]
  }
}
