import React, { PropTypes as t, Component } from 'react'
// import { Link, Route } from 'react-router-dom'
// import { connect } from 'react-redux'
import cx from 'classnames'
import Link from 'shared/components/Link'

// @connect((s) => ({ router: s.router }))
export default class ActiveLink extends Component {
  static propTypes = {
    href: t.string.isRequired,
    target: t.string,
    className: t.string,
    activeClassName: t.string
  }

  render () {
    let { href, target, className, activeClassName, children } = this.props

    let classNames = cx(className)
    // , {
    //   [activeClassName]: router.pathname === href
    // })

    return (
      <Link to={href} target={target} className={classNames}>
        {children}
      </Link>
    )
  }
}
