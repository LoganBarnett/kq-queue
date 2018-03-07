// @flow

import { map } from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { type Dispatch } from 'redux'
import buttonFn from './components/button.jsx'
import buttonStyles from './components/button.css'
import listFn from './components/list.jsx'
import listStyles from './components/list.css'
import listItemFn from './components/list-item.jsx'
import listItemStyles from './components/list-item.css'
import textFieldFn from './components/text-field.jsx'
import textFieldStyles from './components/text-field.css'
import { type Action } from './redux/actions.js'
import { enqueueTeam, setTeamName } from './redux/queue/action.js'
import { type GlobalState } from './redux/state.js'
import { type Team } from './redux/queue/reducer.js'

type ActionProps = {
  onEnqueueTeam: (string) => mixed,
  onSetTeamName: (string) => mixed,
}

type InertProps = {
  enqueueingTeamName: string,
  teams: Array<Team>,
}

type Props = ActionProps & InertProps

const mapStateToProps = (state: GlobalState): InertProps => {
  return {
    enqueueingTeamName: state.queue.enqueueingTeam.name,
    teams: state.queue.queuedTeams,
  }
}

const api = {}
const mapDispatchToProps = (dispatch: Dispatch<Action>): ActionProps => {
  return {
    onSetTeamName: (name: string) => dispatch(setTeamName(name)),
    onEnqueueTeam: (name: string) => dispatch(enqueueTeam(api, {
      name: name,
      players: [],
    }))
  }
}

const AddButton = buttonFn(buttonStyles.add)
const TextField = textFieldFn('', textFieldStyles.enqueueTeamName)
const TeamList = listFn(listStyles.teamQueue)
const TeamListItem = listItemFn(listItemStyles.teamQueue)

const toTeamListItem = (t: Team) => {
  return <TeamListItem key={t.name}>
    {t.name}
  </TeamListItem>
}

export const Component = (props: Props) => {
  return (
    <div>
      <form onSubmit={(e: SyntheticEvent<HTMLFormElement>) => {
        props.onEnqueueTeam(props.enqueueingTeamName)
        e.preventDefault()
      }}>
        <TextField
          placeholder="Enter team name"
          value={props.enqueueingTeamName}
          onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
            props.onSetTeamName(e.target.value)
          }}
        >
          <div></div>
        </TextField>
        <AddButton onClick={() => {}} type="submit">
          add
        </AddButton>
      </form>
      <TeamList>
        {map(toTeamListItem, props.teams)}
      </TeamList>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
