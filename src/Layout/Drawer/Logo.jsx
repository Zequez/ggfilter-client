import th from './Drawer.sass'
import React from 'react'
import Ripple from 'shared/components/Ripple'
import Link from 'shared/components/Link'

const Logo = ({theme, children, to}) => (
  <li className={th.Drawer__Logo}>
    <Link to={to} className={th.Drawer__Link}>
      <span className={th.Drawer__LogoFirst}>GGF</span><span className={th.Drawer__LogoLast}>ilter</span>
    </Link>
    {children}
  </li>
)

export default Ripple()(Logo)
