import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { setFilterMode, FILTER_MODES } from 'stores/reducers/uiReducer'

@connect((s) => ({
  currentMode: s.ui.filterMode
}), {
  setFilterMode
})
export default class TableTabsLink extends Component {
  static propTypes = {
    mode: t.string.isRequired,
    text: t.string,
    icon: t.string,

    currentMode: t.string.isRequired,
    setFilterMode: t.func.isRequired
  }

  onClick (ev) {
    ev.preventDefault()

    let {mode, currentMode, setFilterMode} = this.props
    if (currentMode !== mode) {
      setFilterMode(mode)
    } else {
      setFilterMode(FILTER_MODES.none)
    }
  }

  render () {
    let { mode, currentMode, text, icon } = this.props
    let activeClass = mode === currentMode ? ' active' : ''

    return (
      <li>
        <a className={'btn' + activeClass} href='#' onClick={::this.onClick}>
          {icon ? (
              <i className={`fa icon-${icon}`}></i>
          ) : text}
        </a>
      </li>
    )
  }
}