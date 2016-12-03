import th from '../theme'
import React from 'react'
import cn from 'classnames'
import controlsDefinitions from '../controls'

export default ({filter, params, onChange}) => {
  let controlClass = cn(
    filter.name,
    th.filterControl,
    th['control-' + filter.control]
  )

  let props = {
    query: (params === true || params === false) ? undefined : params,
    name: filter.name,
    options: filter.controlOptions,
    onChange: (value) => onChange(value === null ? true : value)
  }

  let Component = controlsDefinitions[filter.control]

  return (
    <th className={controlClass}>
      <div className={th.filterControlOverflow}>
        <Component {...props}/>
      </div>
    </th>
  )
}
