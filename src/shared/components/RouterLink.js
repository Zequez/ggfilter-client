import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import router from 'src/app/routes'

@connect((s) => ({
  currentRouteName: s.ui.routeName
}))
export default class RouterLink extends Component {
  static propTypes = {
    text: t.string,
    icon: t.string,
    children: t.array,
    to: t.string,

    currentRouteName: t.string
  }

  onClick = (path, ev) => {
    ev.preventDefault()
    console.info(path)
    router.history.push(path)
  }

  render () {
    let { currentRouteName, text, icon, children, to } = this.props
    let path = router.url(to)
    let activeClass = to === currentRouteName ? ' active' : ''

    return (
      <a href={path} className={activeClass} onClick={this.onClick.bind(this, path)}>
        {icon ? (
            <i className={`fa icon-${icon}`}></i>
        ) : text || children}
      </a>
    )
  }
}
