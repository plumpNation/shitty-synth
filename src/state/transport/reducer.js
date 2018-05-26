import logger from '../../lib/logger'
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
  logger.debug(action.payload, 'transportReducer.' + action.type)

  switch (action.type) {
    case TransportActions.PLAY:
      return {...state, isPlaying: true}

    case TransportActions.STOP:
      return {...state, isPlaying: false}

    default:
      logger.debug('transportReducer: no state change')

      return state
  }
}
