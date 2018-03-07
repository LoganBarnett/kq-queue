// @flow

import * as React from 'react'

type Props = {
  placeholder: string,
  children: React.Node,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => mixed,
  value: string,
}

export default (labelClass: string, inputClass: string) => {
  const TextField = ({placeholder, children, value, onChange}: Props) => {
    return (
      <label className={labelClass}>
        {children}
        <input
          className={inputClass}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    )
  }
  return TextField
}
