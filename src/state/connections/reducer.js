import logger from '../../lib/logger'
import ConnectionActions from './actions'

export default reducer

/**
 * @param {Synth.Connections.State} state
 * @param {Redux.Action} action
 * @returns {Synth.Connections.State}
 */
function reducer (state = [], action) {
  switch (action.type) {
    case ConnectionActions.ADD:
      return state.concat(addConnection(state))

    case ConnectionActions.UPDATE:
      return state.map(filter => {
        if (filter.id !== action.payload.id) {
          return filter
        }

        return {...filter, ...action.payload}
      })

    case ConnectionActions.REMOVE:
      return state.filter(filter => filter.id !== action.payload.id)

    default:
      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Synth.Connections.State} state
 * @param {Synth.UIConnection.State | undefined} payload
 * @returns {Synth.Connections.State}
 */
function addConnection (state, payload) {
  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((state[state.length - 1] || {}).id || 0)

  return {...payload, id: lastInsertId + 1}
}
