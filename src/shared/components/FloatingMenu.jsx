import th from './FloatingMenu.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { onClickOutsideOnce } from 'shared/lib/utils'

export default class FloatingMenu extends Component {
  static propTypes = {
    options: t.arrayOf(t.array).isRequired,
    selected: t.any,
    onSelect: t.func.isRequired,
    onClose: t.func,
    style: t.object
  }

  onClickOutsideOnce (cb) {
    onClickOutsideOnce(this.refs.ul, cb)
  }

  onClick (value, index, ev) {
    this.props.onSelect(value, index)
    ev.stopPropagation()
  }

  render () {
    let klass = cx(th.FloatingMenu, {[this.props.className]: this.props.className})

    return (
      <ul className={klass} style={this.props.style} ref='ul'>
        {this.props.options.map(([label, value], i) => (
          <li
            key={value}
            onClick={this.onClick.bind(this, value, i)}
            className={cx(th.FloatingMenu__Item, {
              [th.FloatingMenu__Item_selected]: value === this.props.selected
            })}
          >
            {label}
          </li>
        ))}
      </ul>
    )
  }
}
