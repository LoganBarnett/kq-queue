// @flow

import { combineReducers } from 'redux'
import { reducer as queue, type State as QueueState } from './queue/reducer.js'

export type GlobalState = {
  queue: QueueState,
}

export default combineReducers({
  queue,
})
