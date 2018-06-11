import './index.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './state/configureStore'
import { init as audioInit } from './lib/audio/manager'
import { init as midiInit } from './lib/midi/manager'

import App from './ui/App'

const { persistor, store } = configureStore()

audioInit(store)
midiInit(store)

// UI

const mountNode = document.querySelector('main')

const view = () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>

ReactDOM.render(view(), mountNode)
