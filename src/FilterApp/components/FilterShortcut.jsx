import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { addMask, removeMask } from '../filter/reducer'
import { filterMasksNames } from '../filter/selectors'

@connect((s) => ({
  activeMasks: filterMasksNames(s)
}), {
  addMask,
  removeMask
})
export default class FilterShortcut extends Component {
  static propTypes = {
    children: t.string,
    shortcut: t.object.isRequired,

    addMask: t.func.isRequired,
    removeMask: t.func.isRequired,
    activeMasks: t.arrayOf(t.string).isRequired
  }

  applyShortcut = () => {
    let shortcut = this.props.shortcut
    if (this.isActive) {

    }

    this.props.setShortcut(shortcut)
  }

  isActive = false
  render () {
    let { shortcut, currentFilter, children } = this.props

    this.isActive = isMaskActive(currentFilter, shortcut)
    let active = this.isActive ? 'active' : ''

    return (
      <li className='filter-shortcut'>
        <a className={`btn ${active}`} onClick={::this.applyShortcut}>
          {children}
        </a>
      </li>
    )
  }
}
