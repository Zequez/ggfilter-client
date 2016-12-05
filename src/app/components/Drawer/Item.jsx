import th from './Drawer.sass'
import React from 'react'
import cx from 'classnames'

import Ripple from 'shared/components/Ripple'
import RouterLink from 'shared/components/RouterLink'
import Icon from 'shared/components/Icon'

function Item ({className, to, children, icon, label, ...other}) {
  return (
    <li {...other} className={cx(className, th.Drawer__Item)}>
      <RouterLink
        to={to}
        activeClass={th.Drawer__Link_active}
        className={th.Drawer__Link}>
        <Icon icon={icon} className={th.Drawer__Icon}/><span className={th.Drawer__Label}>{label}</span>
      </RouterLink>
      {children}
    </li>
  )
}

export default Ripple()(Item)
