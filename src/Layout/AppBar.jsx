import th from './Layout.sass'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'

import MenuButton from './MenuButton'

export default class AppBar extends Component {
  static propTypes = {
    children: t.any,
    className: t.string
  }

  render () {
    let {children, className} = this.props

    return (
      <header className={cn(th.Layout__AppBar, className)}>
        <MenuButton/>
        {children}
      </header>
    )
  }
}
