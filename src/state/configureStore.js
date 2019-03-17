import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import oscillatorsReducer from '../state/oscillators/reducer'
import filtersReducer from '../state/filters/reducer'
import transportReducer from '../state/transport/reducer'
import midiReducer from '../state/midi/reducer'

import LoggerMiddleware from './middleware/logger'

const persistConfig = {
  key: 'synthPersist',
  storage
}

const rootReducer = combineReducers({
  oscillators: oscillatorsReducer,
  filters: filtersReducer,
  transport: transportReducer,
  action: (_, action) => action.type,
  payload: (_, action) => action.payload || {},
  midi: midiReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = compose(
  applyMiddleware(LoggerMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const defaultState = {
  oscillators: [],
  devices: []
}

export default () => {
  // reducers, initialState, middleware
  let store = createStore(persistedReducer, undefined, middleware)

  let persistor = persistStore(store)

  return { store, persistor }
}
