import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'

// const TooltippedLabel = tooltipFactory({position: 'bottom'})(({children, theme, ...other}) =>
//   <label {...other}>{children}</label>
// )

class Toggle extends Component {
  static propTypes = {
    active: t.bool.isRequired,
    onToggle: t.func.isRequired,
    title: t.string.isRequired,
    name: t.string.isRequired
  }

  // shouldComponentUpdate (np) {
  //   let tp = this.props
  //   return np.active !== tp.active || np.children !== tp.children
  // }

  onToggle = () => {
    this.props.onToggle(this.props.name, !this.props.active)
  }

  render () {
    let {name, title, active, children, theme, ...other} = this.props
    let iconClass = cn(th.toggleIcon, 'fa', 'icon-filter-' + name)

    return (
      <li className={cn(th.toggle, th['toggle-' + name], {[th.active]: active})}>
        <label title={title} {...other}>
          <input type='checkbox' checked={active} onChange={this.onToggle}/>
          <i className={iconClass}></i>
          <span className={th.toggleTitle}>{title}</span>
          {children}
        </label>
      </li>
    )
  }
}

export default Toggle
