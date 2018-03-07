// @flow

import { append, merge } from 'ramda'
import { type Action } from '../actions.js'

export type Player = {
  name: string,
  role: 'worker' | 'queen',
}

export type Team = {
  name: string,
  players: Array<Player>,
}

export type State = {
  enqueueingTeam: Team,
  queuedTeams: Array<Team>,
}

const initialState = (): State => {
  return {
    enqueueingTeam: { name: '', players: [] },
    queuedTeams: [],
  }
}

export const reducer = (
  state: State = initialState(),
  action: Action,
): State => {
  switch(action.type) {
  case 'enqueue-team':
    return merge(state, {
      queuedTeams: append(action.team, state.queuedTeams),
      enqueueingTeam: { name: '' },
    })
  case 'set-team-name':
    return merge(state, {
      enqueueingTeam: { name: action.name },
    })
  default:
    return state
  }
}
