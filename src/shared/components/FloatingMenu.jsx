import th from './FloatingMenu.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export default class FloatingMenu extends Component {
  static propTypes = {
    options: t.arrayOf(t.array).isRequired,
    onSelect: t.func.isRequired
  }

  onMouseDown (value) {
    this.props.onSelect(value)
  }

  render () {
    return (
      <ul className={cx(th.FloatingMenu, {[this.props.className]: this.props.className})}>
        {this.props.options.map(([label, value]) => (
          <li key={value} onMouseDown={this.onMouseDown.bind(this, value)}>{label}</li>
        ))}
      </ul>
    )
  }
}
