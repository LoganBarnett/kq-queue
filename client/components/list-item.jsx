// @flow
import * as React from 'react'

type Props = {
  children: React.Node,
}

export default (className: string) => {
  const ListItem = ({children}: Props) => {
    return <li className={className}>
      {children}
    </li>
  }
  return ListItem
}
