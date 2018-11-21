import th from './Layout.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { Drawer } from './Drawer'

export default class Layout extends Component {
  // static propTypes = {
  //   children: t.node
  // }

  render () {
    let { children } = this.props
    return (
      <div className={th.Layout}>
        { children }
      </div>
    )
  }
}
