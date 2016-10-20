import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import router from 'src/app/routes'
import { setMode, MODES } from 'shared/reducers/uiReducer'

@connect((s) => ({
  mode: s.ui.mode
}), {
  setMode
})
export default class FilterTabLink extends Component {
  static propTypes = {
    mode: t.string,
    setMode: t.func.isRequired
  }

  onClick = (ev) => {
    ev.preventDefault()
    this.props.setMode(MODES.filter)
  }

  render () {
    let { mode } = this.props
    let activeClass = mode === MODES.filter ? 'active' : ''
    let path = router.url(MODES.filter)

    return (
      <a href={path} className={activeClass} onClick={this.onClick}>
        Filter
      </a>
    )
  }
}
