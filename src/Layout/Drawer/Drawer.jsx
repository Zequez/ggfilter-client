import th from './Drawer.sass'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { drawerOpen } from '../selectors'
import { closeDrawer } from '../reducer'

import Item from './Item'
import Logo from './Logo'


@connect((s) => ({ expanded: drawerOpen(s) }), { onRequestClose: closeDrawer })
export default class Drawer extends Component {
  static propTypes = {
    onRequestClose: t.func,
    expanded: t.bool,
    headerTo: t.string,
    children: t.node
  }

  onClick = () => {
    if (this.props.expanded) {
      this.props.onRequestClose()
    }
  }

  render () {
    let { headerTo, children } = this.props

    const className = cx(th.Drawer, {
      [th.Drawer_expanded]: this.props.expanded
    })

    return (
      <nav className={className} onClick={this.onClick}>
        <ul className={th.Drawer__Items}>
          <Logo to={headerTo}/>
          {children}
        </ul>
        <div className={th.Drawer__Veil}></div>
      </nav>
    )
  }
}
