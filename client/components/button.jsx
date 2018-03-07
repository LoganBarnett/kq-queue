// @flow

import * as React from 'react'

type Props = {
  children: React.Node,
  onClick: (SyntheticEvent<HTMLButtonElement>) => mixed,
  type?: 'reset' | 'button' | 'submit',
}

export default (buttonClass: string) => {
  const Button = ({children, onClick, type}: Props) => {
    return (
      <button
        className={buttonClass}
        onClick={onClick}
        type={type || 'button'}
      >
        {children}
      </button>
    )
  }
  return Button
}
