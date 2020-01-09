import logger from '../../lib/logger'
import FilterActions from './actions'
import Filter from '../../lib/filters/Filter'

/** @type {Synth.Filter.State} */
const defaultFilter = {
  frequency: 100,
  type: Filter.LOW_PASS,
  isActive: true
}

export default reducer

/**
 * @param {Synth.Filters.State} state
 * @param {Redux.Action} action
 * @returns {Synth.Filters.State}
 */
function reducer (state = [], action) {
  switch (action.type) {
    case FilterActions.ADD:
      return state.concat(addFilter(state, defaultFilter))

    case FilterActions.UPDATE:
      return state.map(filter => {
        if (filter.id !== action.payload.id) {
          return filter
        }

        return {...filter, ...action.payload}
      })

    case FilterActions.REMOVE:
      return state.filter(filter => filter.id !== action.payload.id)

    default:
      return state
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Synth.Filters.State} state
 * @param {Synth.Filter.State | undefined} payload
 * @returns {Synth.Filter.State}
 */
function addFilter (state, payload) {
  if (state.length === 6) {
    logger.warn('Jeff says "no more oscillators for you"')

    return
  }

  /** @type {Synth.Oscillator.Id} */
  const lastInsertId = ((state[state.length - 1] || {}).id || 0)

  return {...payload, id: lastInsertId + 1}
}
