import { active, label as labelClass } from './theme'
import React from 'react'
import Ripple from 'react-toolbox/lib/ripple'
import RouterLink from 'shared/components/RouterLink'

function Tab ({className, to, children, icon, label, theme, ...other}) {
  return (
    <li className={className} {...other}>
      <RouterLink to={to} activeClass={active}>
        <i className={`fa icon-${icon}`}></i><span className={labelClass}>{label}</span>
      </RouterLink>
      {children}
    </li>
  )
}

export default Ripple()(Tab)
