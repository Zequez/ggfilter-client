import th from './Layout.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { closeDrawer } from './reducer'
import { drawerOpen } from './selectors'

import Drawer from './Drawer'

@connect((s) => ({ drawerOpen: drawerOpen(s) }), { closeDrawer })
export default class Layout extends Component {
  static propTypes = {
    children: t.node,

    drawerOpen: t.bool.isRequired,
    closeDrawer: t.func.isRequired
  }

  onRequestClose = () => {
    this.props.closeDrawer()
  }

  render () {
    let { children, drawerOpen } = this.props

    return (
      <div className={th.Layout}>
        <Drawer expanded={drawerOpen} onRequestClose={this.onRequestClose}/>
        { children }
      </div>
    )
  }
}
