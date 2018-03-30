import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import synthsReducer from '../state/synths/reducer'

const persistConfig = {
  key: 'synthPersist',
  storage
}

const rootReducer = combineReducers({
  synths: synthsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)

  return { store, persistor }
}

//     window.devToolsExtension ? window.devToolsExtension() : f => f
