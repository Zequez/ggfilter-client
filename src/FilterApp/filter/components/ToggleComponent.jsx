import React from 'react'
import cn from 'classnames'
import togglesDefinitions from './toggles'

export default ({filter, active, onToggle}) => {
  let Component = togglesDefinitions[filter.toggle]

  let toggleClass = cn(
    filter.name,
    'filter-toggle',
    'toggle-' + filter.toggle
  )

  return (
    <li className={toggleClass}>
      <Component onToggle={onToggle} active={active} filter={filter}/>
    </li>
  )
}
