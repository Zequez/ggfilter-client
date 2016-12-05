import th from './Layout.sass'
import React, { Component, PropTypes as t } from 'react'

import Drawer from '../Drawer'
import PageContent from './PageContent'

export default class Layout extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  state = {
    drawerOpen: false
  }

  onCloseDrawer = () => {
    this.setState({drawerOpen: false})
  }

  onClickHamburguer = () => {
    this.setState({drawerOpen: true})
  }

  render () {
    let { mode, drawerOpen } = this.props

    return (
      <div className={th.Layout}>
        <Drawer expanded={drawerOpen} onClose={this.onCloseDrawer}/>
        <PageContent mode={mode} onClickHamburguer={this.onClickHamburguer}/>
      </div>
    )
  }
}
