import './index.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './state/configureStore'
import { createAudioPlayer } from './lib/audio/player'

import Oscillator from './lib/oscillators/Oscillator'

import TransportActions from './state/transport/actions'
import OscillatorActions from './state/oscillators/actions'

import App from './ui/App'

const { persistor, store } = configureStore()

// @TODO Move this out into a controller
// Stores the actual audio oscillators
// Maybe this could be done better with React somehow?
// Could look into redux saga?
const oscillatorsT = {}

store.subscribe(() => {
  const {
    action,
    payload,
    oscillators,
    transport
  } = store.getState()

  // handle creation of new oscillators
  if (action === OscillatorActions.ADD || action === 'persist/REHYDRATE') {
    oscillators.forEach(oscillator => {
      const {id, type, frequency} = oscillator

      if (oscillatorsT[id]) {
        return
      }

      oscillatorsT[id] = new Oscillator({type, frequency})

      if (transport.isPlaying) {
        oscillatorsT[id].play()
      }
    })
  }

  if (action === OscillatorActions.UPDATE) {
    const {id} = payload

    payload.type && oscillatorsT[id].updateType(payload.type)
    payload.frequency && oscillatorsT[id].updateFrequency(payload.frequency)
  }

  // Handle removal of oscillators
  const oscillatorIds = oscillators.map(oscillator => oscillator.id)

  Object.keys(oscillatorsT).forEach(id => {
    if (action === OscillatorActions.REMOVE) {
      if (oscillatorIds.indexOf(parseInt(id, 10)) < 0) {
        oscillatorsT[id].kill()

        delete oscillatorsT[id]
      }
    }

    // I've exposed the action on the state so we can utilise it in this
    // more vanilla section of the codebase.
    if ([TransportActions.PLAY, TransportActions.STOP].indexOf(action) > -1) {
      if (transport.isPlaying) {
        oscillatorsT[id].play()
      } else {
        oscillatorsT[id].stop()
      }
    }
  })
})

// UI

const mountNode = document.querySelector('main')

const view = () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>

createAudioPlayer(store)

ReactDOM.render(view(), mountNode)
