import th from './FilterApp.sass'

import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import Chip from 'react-toolbox/lib/chip'

import { partial as p } from 'shared/lib/utils'
import { addMask, removeMask } from '../filter/reducer'
import { filterMasksNames } from '../filter/selectors'

import masks from '../config/masks'

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
      let klass = cn(th.maskChip, {
        [th.activeMaskChip]: this.isActive(name)
      })
      items.push(
        <Chip key={name} onClick={p(this.onClick, name)} className={klass}>
          {mask.title}
        </Chip>
      )
    }

    return (
      <div className={th.filterMasks}>
        <div className={th.filterMasksLabel}>
          Shortcuts
        </div>
        {items}
      </div>
    )
  }
}
