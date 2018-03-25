import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.styl'

import store from './modules/state/store'
import App from './App'

const mountNode = document.querySelector('main')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
)
