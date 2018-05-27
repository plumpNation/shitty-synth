import TransportActions from '../transport/actions'

export default reducer

const defaultState = {
  isPlaying: false
}

/**
 * @param {Synth.Transport.State} state
 * @param {Redux.Action} action
 * @returns {Redux.Reducer}
 */
function reducer (state = defaultState, action) {
  switch (action.type) {
    case TransportActions.PLAY:
      return {...state, isPlaying: true}

    case TransportActions.STOP:
      return {...state, isPlaying: false}

    default:
      return state
  }
}
