import th from './Drawer.sass'
import React, { Component } from 'react'
import Ripple from 'shared/components/Ripple'
import Icon from 'shared/components/Icon'
// import ActiveLink from './ActiveLink'
import Link from 'shared/components/Link'

class Item extends Component {
  render () {
    let { to, children, icon, label, target } = this.props

    return (
      <li className={th.Drawer__Item}>
        <Link
          to={to}
          target={target}
          className={th.Drawer__Link}
          activeClassName={th.Drawer__Link_active}>
          <Icon icon={icon} className={th.Drawer__Icon}/>
          <span className={th.Drawer__Label}>
            {label}
          </span>
        </Link>
        {children}
      </li>
    )
  }
}

export default Ripple()(Item)
