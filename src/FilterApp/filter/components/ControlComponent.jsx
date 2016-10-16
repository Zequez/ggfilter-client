import React from 'react'
import cn from 'classnames'
import controlsDefinitions from './filters'

export default ({filter, params, onChange}) => {
  let controlClass = cn(
    filter.name,
    'filter-control',
    'control-' + filter.filter
  )

  let props = {
    query: params,
    name: filter.name,
    options: filter.filterOptions,
    onChange
  }

  let Component = controlsDefinitions[filter.filter]

  return (
    <th className={controlClass}>
      <Component {...props}/>
    </th>
  )
}
