import { createStore, compose, combineReducers } from 'redux'

import synthsReducer from '../state/synths/reducer'

const rootReducer = combineReducers({
  synths: synthsReducer
})

const store = createStore(
  rootReducer,
  undefined, // middleware
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
