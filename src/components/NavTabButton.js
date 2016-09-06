import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

@connect((s) => ({ pathname: s.routing.location.pathname }))
export default class NavTabButton extends Component {
  static propTypes = {
    href: t.string,
    onActivate: t.func,
    onDeactivate: t.func,
    icon: t.string,
    text: t.string,
    active: t.bool,

    pathname: t.string
  }

  onClick (ev) {
    ev.preventDefault()
    let { onActivate, onDeactivate, href } = this.props
    if (this.isActive()) {
      if (onDeactivate) onDeactivate(href)
    } else {
      if (onActivate) onActivate(href)
      else browserHistory.push(href)
    }
  }

  isActive () {
    let { active, pathname, href } = this.props
    return active == null ? pathname === href : active
  }

  render () {
    let { icon, text, href } = this.props

    let activeClass = this.isActive() ? 'active' : ''

    return (
      <li>
        <a
          href={href || '#'}
          onClick={::this.onClick}
          className={activeClass}>
          {icon ? (
              <i className={`fa icon-${icon}`}></i>
          ) : text}
        </a>
      </li>
    )
  }
}
