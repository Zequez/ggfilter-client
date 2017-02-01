import React, { PropTypes as t, Component } from 'react'
import { Link } from 'redux-little-router'
import { connect } from 'react-redux'
import cx from 'classnames'

@connect((s) => ({ router: s.router }))
export default class ActiveLink extends Component {
  static propTypes = {
    href: t.string.isRequired,
    target: t.string,
    className: t.string,
    activeClassName: t.string
  }

  render () {
    let { href, target, className, activeClassName, children, router } = this.props
    let Comp = href.startsWith('http') ? 'a' : Link

    let classNames = cx(className, {
      [activeClassName]: router.pathname === href
    })

    return (
      <Comp href={href} target={target} className={classNames}>
        {children}
      </Comp>
    )
  }
}
