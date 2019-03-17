/** @type {string} */
const ADD = 'filterAdd'
/** @type {string} */
const UPDATE = 'filterUpdate'
/** @type {string} */
const REMOVE = 'filterRemove'

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
 * @param {Synth.UIFilter.State} payload
 * @returns {Redux.Action}
 */
function update (payload) {
  return {
    type: UPDATE,
    payload
  }
}

/**
 * @param {Synth.UIFilter.State} payload
 * @returns {Redux.Action}
 */
function remove (payload) {
  return {
    type: REMOVE,
    payload
  }
}
