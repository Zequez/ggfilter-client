import React, { PropTypes as t, Component } from 'react'

import { connect } from 'react-redux'
import { partial as p } from 'shared/lib/utils'
import { addMask, removeMask } from '../filter/reducer'
import { filterMasksNames } from '../filter/selectors'

import masks from '../config/masks'
import FilterMask from './FilterMask'

@connect((s) => ({
  activeMasks: filterMasksNames(s)
}), {
  addMask,
  removeMask
})
export default class FilterMasks extends Component {
  static propTypes = {
    addMask: t.func.isRequired,
    removeMask: t.func.isRequired,
    activeMasks: t.arrayOf(t.string).isRequired
  }

  onClick = (name) => {
    if (~this.props.activeMasks.indexOf(name)) {
      this.props.removeMask(name)
    } else {
      this.props.addMask(name)
    }
  }

  isActive (name) {
    return this.props.activeMasks.indexOf(name) !== -1
  }

  render () {
    let items = []

    for (let name in masks) {
      let mask = masks[name]
      let activeClass = this.isActive(name) ? 'active' : ''
      items.push(
        <li key={name}>
          <a
            className={`btn ${activeClass}`}
            onClick={p(this.onClick, name)}>
            {mask.title}
          </a>
        </li>
      )
    }

    return (
      <li className='filter-masks'>
        <ul>
          {items}
        </ul>
      </li>
    )
  }
}
