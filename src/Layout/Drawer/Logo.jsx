import th from './Drawer.sass'
import React from 'react'
import Ripple from 'shared/components/Ripple'
import { Link } from 'redux-little-router'

const Logo = ({theme, children, href}) => (
  <li className={th.Drawer__Logo}>
    <Link href={href} className={th.Drawer__Link}>
      <span className={th.Drawer__LogoFirst}>GGF</span><span className={th.Drawer__LogoLast}>ilter</span>
    </Link>
    {children}
  </li>
)

export default Ripple()(Logo)
