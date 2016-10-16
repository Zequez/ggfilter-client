import React from 'react'
import cn from 'classnames'
import controlsDefinitions from './controls'

export default ({filter, params, onChange}) => {
  let controlClass = cn(
    filter.name,
    'filter-control',
    'control-' + filter.control
  )

  let props = {
    query: params,
    name: filter.name,
    options: filter.controlOptions,
    onChange
  }

  let Component = controlsDefinitions[filter.control]

  return (
    <th className={controlClass}>
      <Component {...props}/>
    </th>
  )
}
