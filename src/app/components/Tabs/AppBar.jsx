import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'

import MenuButton from './MenuButton'

export default class AppBar extends Component {
  static propTypes = {
    children: t.any,
    onClickMenu: t.func,
    className: t.string
  }

  render () {
    let {children, onClickMenu, className} = this.props

    return (
      <header className={cn(th.appBar, className)}>
        <MenuButton onClick={onClickMenu}/>
        {children}
      </header>
    )
  }
}
