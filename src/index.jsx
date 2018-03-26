import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.styl'

import store from './state/store'
import App from './ui/App'

const mountNode = document.querySelector('main')

const view = () =>
  <Provider store={store}>
    <App />
  </Provider>

ReactDOM.render(view(), mountNode)
