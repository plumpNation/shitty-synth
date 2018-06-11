import MidiActions from '../midi/actions'

export default reducer

const defaultState = {
  devices: []
}

/**
 * @param {Synth.Midi.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = defaultState, action) {
  switch (action.type) {
    case MidiActions.UPDATE_ACCESS:
      const devices = extractDevices(action.payload)

      return {...state, devices}

    case MidiActions.NOTE:
      return {...state}

    default:
      return state
  }
}

/**
 *
 * @param {MIDIAccess} access
 * @returns {MIDIInput[]} devices
 */
function extractDevices (access) {
  const devices = []

  if (access.inputs && access.inputs.size > 0) {
    const inputs = access.inputs.values()
    let input = null

    // iterate through the devices
    for (input = inputs.next(); input && !input.done; input = inputs.next()) {
      devices.push(input)
    }
  } else {
    console.warn('No midi devices detected!')
  }

  return devices
}
