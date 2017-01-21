import th from './Drawer.sass'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { MODES } from 'shared/reducers/uiReducer'
import Item from './Item'
import Logo from './Logo'

@connect((s) => ({
  currentUser: s.auth.currentUser
}))
export default class Tabs extends Component {
  static propTypes = {
    onRequestClose: t.func,
    expanded: t.bool
  }

  onClick = () => {
    if (this.props.expanded) {
      this.props.onRequestClose()
    }
  }

  render () {
    const className = cx(th.Drawer, {
      [th.Drawer_expanded]: this.props.expanded
    })

    return (
      <nav className={className} onClick={this.onClick}>
        <ul className={th.Drawer__Items}>
          <Logo to='root'/>
          <Item to={MODES.filter} label='Filter' icon='filter'/>
          <Item to={MODES.sysreq} label="Sys. Req. Calculator" icon='sysreq'/>
          <Item to={MODES.feedback} label="Feedback" icon='feedback'/>
          <Item to={MODES.contribute} label="Donations" icon='contribute'/>
          <Item href='http://zequez.com/about-me/' label="Author" icon='about'/>
        </ul>
        <div className={th.Drawer__Veil}></div>
      </nav>
    )
  }
}
