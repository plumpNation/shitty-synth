import { createStore, compose, combineReducers } from 'redux'

import synthReducer from '../synths/synthReducer'

const rootReducer = combineReducers({
  synth: synthReducer
})

const store = createStore(
  rootReducer,
  undefined, // middleware
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
