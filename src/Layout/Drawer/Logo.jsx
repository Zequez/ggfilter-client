import th from './Drawer.sass'
import React from 'react'
import Ripple from 'shared/components/Ripple'
import RouterLink from 'shared/components/RouterLink'

const Logo = ({theme, children, ...props}) => (
  <li className={th.Drawer__Logo}>
    <RouterLink {...props} className={th.Drawer__Link}>
      <span className={th.Drawer__LogoFirst}>GGF</span><span className={th.Drawer__LogoLast}>ilter</span>
    </RouterLink>
    {children}
  </li>
)

export default Ripple()(Logo)
