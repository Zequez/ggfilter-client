import React, { PropTypes as t, Component } from 'react'
import _values from 'lodash/values'
import { MODES } from 'stores/reducers/modeReducer'
import router from 'sources/stateRoutes'

export default class NavTabLink extends Component {
  static propTypes = {
    currentMode: t.oneOf(_values(MODES)),
    mode: t.oneOf(_values(MODES)),
    setMode: t.func.isRequired,

    text: t.string,
    icon: t.string
  }

  fallbackMode = MODES.filter

  onClick (ev) {
    ev.preventDefault()
    let { mode, currentMode, setMode } = this.props
    if (mode === currentMode) {
      if (mode !== this.fallbackMode) setMode(this.fallbackMode)
    } else {
      setMode(mode)
    }
  }

  render () {
    let { mode, currentMode, text, icon } = this.props
    let href = router.url(mode)
    let activeClass = mode === currentMode ? 'active' : ''

    return (
      <li>
        <a className={activeClass} href={href} onClick={::this.onClick}>
          {icon ? (
              <i className={`fa icon-${icon}`}></i>
          ) : text}
        </a>
      </li>
    )
  }
}
