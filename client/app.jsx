// @flow

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import state from './redux/state.js'
import Main from './main.jsx'
import './reset.css'

const store = createStore(state, applyMiddleware(logger))

if (document.body) {
  render(
    <Provider store={store}>
      <Main/>
    </Provider>,
    document.body
  )
}
