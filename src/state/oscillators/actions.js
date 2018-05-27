/** @type {string} */
const ADD = 'oscillatorAdd'
/** @type {string} */
const UPDATE = 'oscillatorUpdate'
/** @type {string} */
const REMOVE = 'oscillatorRemove'

export default {
  ADD,
  UPDATE,
  REMOVE,

  add,
  update,
  remove
}

/**
 * @returns {Redux.Action}
 */
function add () {
  return {
    type: ADD
  }
}

/**
 * @param {Synth.OscillatorModule.State} payload
 * @returns {Redux.Action}
 */
function update (payload) {
  return {
    type: UPDATE,
    payload
  }
}

/**
 * @param {Synth.OscillatorModule.State} payload
 * @returns {Redux.Action}
 */
function remove (payload) {
  return {
    type: REMOVE,
    payload
  }
}
