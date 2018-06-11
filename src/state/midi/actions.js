/** @type {string} */
const NOTE = 'midiNote'
const UPDATE_ACCESS = 'midiNewAccess'

export default {
  NOTE,
  UPDATE_ACCESS,

  note,
  newAccess
}

/**
 * @param {MidiNote}
 * @returns {Redux.Action}
 */
function note (payload) {
  return {
    type: NOTE,
    payload
  }
}

/**
 * @param {MIDIAccess}
 * @returns {Redux.Action}
 */
function newAccess (payload) {
  return {
    type: UPDATE_ACCESS,
    payload
  }
}
