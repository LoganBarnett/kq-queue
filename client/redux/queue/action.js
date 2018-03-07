// @flow

import { type Api } from '../../api.js'
import { type Team } from './reducer.js'

export type ActionType =
  | 'enqueue-team'
  | 'request-teams'
  | 'fail-getting-teams'
  | 'success-getting-teams'
  | 'set-enqueueing-team-name'
  | 'set-team-name'

export type EnqueueTeamAction = {
  team: Team,
  type: 'enqueue-team',
}

export type SetTeamName = {
  type: 'set-team-name',
  name: string,
}

export type RequestTeamsAction = {
  type: 'request-teams',
}


export type Action =
  | EnqueueTeamAction
  | RequestTeamsAction
  | SetTeamName

export const enqueueTeam = (api: Api, team: Team): EnqueueTeamAction => {
  return { team, type: 'enqueue-team' }
}

export const setTeamName = (name: string): SetTeamName => {
  return { name, type: 'set-team-name'}
}
