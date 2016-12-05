import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import router from 'src/app/routes'

@connect((s) => ({
  currentRouteName: s.ui.mode
}))
export default class RouterLink extends Component {
  static propTypes = {
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
    let { currentRouteName, children, to, activeClass, className } = this.props
    let path = router.url(to)
    let finalClassName = cx(className, {
      [activeClass]: to === currentRouteName
    })

    return (
      <a href={path} className={finalClassName} onClick={this.onClick.bind(this, path)}>
        {children}
      </a>
    )
  }
}
