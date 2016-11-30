import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'

export default class Toggle extends Component {
  static propTypes = {
    active: t.bool.isRequired,
    onToggle: t.func.isRequired,
    title: t.string.isRequired,
    name: t.string.isRequired
  }

  shouldComponentUpdate (np) {
    return np.active !== this.props.active
  }

  onToggle = () => {
    this.props.onToggle(this.props.name, !this.props.active)
  }

  render () {
    let {name, title, active} = this.props
    let toggleClass = cn(th.toggleIcon, 'fa', 'icon-filter-' + name)

    return (
      <li className={cn(th.toggle, th['toggle-' + name], {[th.active]: active})} title={title}>
        <label>
          <input type='checkbox' checked={active} onChange={this.onToggle}/>
          <span className={th.toggleTitle}>{title}</span>
          <i className={toggleClass}></i>
        </label>
      </li>
    )
  }
}
