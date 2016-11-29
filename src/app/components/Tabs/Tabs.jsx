import th from './theme'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { MODES } from 'shared/reducers/uiReducer'
import Tab from './Tab'
import Logo from './Logo'

@connect((s) => ({
  currentUser: s.auth.currentUser
}))
export default class Tabs extends Component {
  static propTypes = {
    onClick: t.func
  }

  render () {
    return (
      <nav className={th.tabs} onClick={this.props.onClick}>
        <ul>
          <Logo/>
          <Tab to={MODES.filter} label='Filter' icon='filter'/>
          <Tab to={MODES.sysreq} label="Sys. Req. Calculator" icon='sysreq'/>
          <Tab to={MODES.feedback} label="Feedback" icon='feedback'/>
          <Tab to={MODES.contribute} label="Contribute" icon='contribute'/>
        </ul>
      </nav>
    )
  }
}
