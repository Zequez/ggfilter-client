import th from './theme'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import Tabs from './Tabs'
import TabsContent from './TabsContent'

@connect((s) => ({
  mode: s.ui.mode
}))
export default class TabsContainer extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  state = {
    drawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  closeDrawer = () => {
    if (this.state.drawerOpen) this.toggleDrawer()
  }

  render () {
    let { mode } = this.props
    let { drawerOpen } = this.state

    let className = cn(th.container, {
      [th.open]: drawerOpen
    })

    return (
      <div className={className}>
        <Tabs onClick={this.closeDrawer}/>
        <TabsContent mode={mode} onClickMenu={this.toggleDrawer}/>
        <div className={th.veil} onClick={this.toggleDrawer}></div>
      </div>
    )
  }
}
