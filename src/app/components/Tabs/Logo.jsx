import th from './theme'
import React from 'react'
import Ripple from 'react-toolbox/lib/ripple'

const Logo = ({theme, children, ...props}) => (
  <li className={th.logo}>
    <a {...props}>
      <span className={th.logoFirst}>GGF</span><span className={th.logoLast}>ilter</span>
    </a>
    {children}
  </li>
)

export default Ripple()(Logo)