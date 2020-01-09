import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import oscillatorsReducer from '../state/oscillators/reducer'
import filtersReducer from '../state/filters/reducer'
import transportReducer from '../state/transport/reducer'
import transportActions from '../state/transport/actions'
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
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

export const defaultState = {
  oscillators: [],
  devices: []
}

export default () => {
  // reducers, initialState, middleware
  let store = createStore(persistedReducer, undefined, middleware)

  let persistor = persistStore(store)

  window.addEventListener('beforeunload', () => {
    // Transport should stop before leaving page, as AudioContext must be
    // resumed or created by user interaction.
    store.dispatch(transportActions.stop())
  })

  return { store, persistor }
}
