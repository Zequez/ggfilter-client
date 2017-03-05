import th from './Drawer.sass'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Item from './Item'
import Logo from './Logo'

export class Drawer extends Component {
  static propTypes = {
    onRequestClose: t.func,
    expanded: t.bool,
    // headerTo: t.string,
    // children: t.nodes
  }

  onClick = () => {
    if (this.props.expanded) {
      this.props.onRequestClose()
    }
  }

  render () {
    // let { headerTo, children } = this.props

    const className = cx(th.Drawer, {
      [th.Drawer_expanded]: this.props.expanded
    })

    return (
      <nav className={className} onClick={this.onClick}>
        <ul className={th.Drawer__Items}>
          <Logo to='root'/>
          <Item to='filterRedirect' label='Filter' icon='filter'/>
          <Item to='sysreq' label="Sys. Req. Calculator" icon='sysreq'/>
          <Item to='feedback' label="Feedback" icon='feedback'/>
          <Item to='donations' label="Donations" icon='contribute'/>
          <Item to='http://zequez.com/about-me/' target='_blank' label="Author" icon='about'/>

        </ul>
        <div className={th.Drawer__Veil}></div>
      </nav>
    )
  }
}

export default connect((s) => ({
  currentUser: s.auth.currentUser
}))(Drawer)
