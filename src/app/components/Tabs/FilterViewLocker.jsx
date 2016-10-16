import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import { lockFilterIntoView, MODES } from 'shared/reducers/uiReducer'

@connect((s) => ({
  locked: s.ui.filterLockedInView,
  hide: s.ui.mode === MODES.filter
}), { lock: lockFilterIntoView })
export default class FilterViewLocker extends Component {
  static propTypes = {
    locked: t.bool.isRequired,
    lock: t.func.isRequired,
    hide: t.bool.isRequired
  }

  toggle = (ev) => {
    ev.preventDefault()
    this.props.lock(!this.props.locked)
  }

  render () {
    let { locked, hide } = this.props

    if (hide) return null

    let iconClass = locked ? 'icon-locked' : 'icon-unlocked'
    let text = locked ? 'Filter locked' : 'Show filter'
    let activeClass = locked ? 'active' : ''

    return (
      <li className='filter-view-locker'>
        <a className={activeClass} onClick={this.toggle}>
          <i className={`fa ${iconClass}`}/> {text}
        </a>
      </li>
    )
  }
}
