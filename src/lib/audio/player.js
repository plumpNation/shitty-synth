export default {
  createAudioPlayer
}

/**
 *
 * @param {Synth.State} state
 */
function updateAudio (state) {
  // play your shit here
}

// AUDIO
export function createAudioPlayer (store) {
  const unsubscribe = store.subscribe(() => updateAudio(store.getState()))

  return unsubscribe
}
