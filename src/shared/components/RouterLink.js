import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import router from 'src/app/routes'

@connect((s) => ({
  currentRouteName: s.ui.mode
}))
export default class RouterLink extends Component {
  static propTypes = {
    text: t.string,
    icon: t.string,
    children: t.any,
    to: t.string,
    activeClass: t.string,

    currentRouteName: t.string
  }

  static defaultProps = {
    activeClass: 'active'
  }

  onClick = (path, ev) => {
    ev.preventDefault()
    router.history.push(path)
  }

  render () {
    let { currentRouteName, text, icon, children, to, activeClass } = this.props
    let path = router.url(to)
    let activeClassResolve = to === currentRouteName ? activeClass : ''

    return (
      <a href={path} className={activeClassResolve} onClick={this.onClick.bind(this, path)}>
        {icon ? <i className={`fa icon-${icon}`}></i> : null}
        {text || null}
        {children || null}
      </a>
    )
  }
}
