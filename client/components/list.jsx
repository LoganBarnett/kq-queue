// @flow
import * as React from 'react'

type Props = {
  children: React.Node,
}

export default (className: string) => {
  const List = ({children}: Props) => {
    return <ul className={className}>
      {children}
    </ul>
  }
  return List
}
