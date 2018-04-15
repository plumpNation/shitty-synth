import { compose, createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import oscillatorsReducer from '../state/oscillators/reducer'

const persistConfig = {
  key: 'synthPersist',
  storage
}

const rootReducer = combineReducers({
  oscillators: oscillatorsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancer = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const defaultState = {
  oscillators: []
}

export default () => {
  let store = createStore(persistedReducer, undefined, enhancer)

  let persistor = persistStore(store)

  return { store, persistor }
}
