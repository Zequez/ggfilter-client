import React from 'react'
import { partial } from 'shared/lib/utils'

export default ({active, name, title, onToggle}) => (
  <li className={'categories-columns-toggle ' + active ? 'active' : ''}>
    <label>
      <input type='checkbox' checked={active} onClick={partial(onToggle, name, !active)}/> {title}
    </label>
  </li>
)
