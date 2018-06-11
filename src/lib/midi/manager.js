/**
 * The manager reacts to the update of the redux store. All functionality
 * in this manager should be idempotent, and should be able to handle multiple
 * store updates where some properties do not change. The manager should
 * recognize that the property is unchanged and not re-run the pertinent
 * functionality, rather allow it to simply continue.
 */

import MidiActions from '../../state/midi/actions'

export function init (store) {
  updateAccess(store)
}

function updateAccess (store) {
  const midi = navigator.requestMIDIAccess()

  midi.then(access => {
    store.dispatch(MidiActions.newAccess(access))
  })
}
