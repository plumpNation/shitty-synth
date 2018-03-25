import { createStore, compose, combineReducers } from 'redux'

import synthReducer from '../synths/synthReducer'

const rootReducer = combineReducers({
  synthReducer
})

/** @type {Redux.Store} */
const store = createStore(
  rootReducer,
  undefined,
  compose(
    devTools()
  )
)

export default store

/**
 * @returns {Function}
 */
function devTools () {
  /** @type {boolean | void | Function} */
  const devToolsMiddleware =
    typeof window.devToolsExtension === 'function' &&
    window.devToolsExtension()

  return devToolsMiddleware || (f => f)
}
