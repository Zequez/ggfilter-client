import th from './Layout.sass'

import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export default class Page extends Component {
  static propTypes = {
    className: t.string,
    children: t.node.isRequired
  }

  render () {
    let { children, className } = this.props
    return (
      <main className={cx(th.Layout__Page, className)}>
        {children}
      </main>
    )
  }
}
