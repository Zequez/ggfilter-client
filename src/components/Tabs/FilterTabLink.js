import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import router from 'sources/stateRoutes'
import { setMode, MODES } from 'shared/reducers/uiReducer'

let routesNames = ['filter', 'filterB64', 'filterSid', 'filterOfficial']

@connect((s) => ({
  currentRouteName: s.ui.routeName
}), {
  setMode
})
export default class FilterTabLink extends Component {
  static propTypes = {
    currentRouteName: t.string,
    setMode: t.func.isRequired
  }

  onClick = (ev) => {
    ev.preventDefault()
    this.props.setMode(MODES.filter)
  }

  render () {
    let { currentRouteName } = this.props
    let activeClass = ~routesNames.indexOf(currentRouteName) ? 'active' : ''
    let path = router.url(MODES.filter)

    return (
      <a href={path} className={activeClass} onClick={this.onClick}>
        Filter
      </a>
    )
  }
}
