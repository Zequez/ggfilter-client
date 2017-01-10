import React from 'react'
import enumColumns from '../../../config/enumColumns'

export default function ({query: {value}}) {
  let keys = Object.keys(enumColumns.values.controller_support)
  let values = Object.values(enumColumns.values.controller_support)
  let key = keys[values.indexOf(value)]

  return (
    <div>{enumColumns.names.controller_support[key]}</div>
  )
}
