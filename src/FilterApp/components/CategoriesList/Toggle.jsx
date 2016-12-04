import th from './CategoriesList.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

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
    let {
      name,
      title,
      active,
      children,
      theme, //eslint-disable-line no-unused-vars
      onToggle, //eslint-disable-line no-unused-vars
      ...other
    } = this.props

    let iconClass = cx(th.CategoriesList__Icon, 'fa', 'icon-filter-' + name)
    let className = cx(
      th.CategoriesList__Toggle,
      th['CategoriesList__Toggle_' + name],
      {[th.CategoriesList__Toggle_active]: active}
    )

    return (
      <li className={className}>
        <label title={title} {...other}>
          <input type='checkbox' checked={active} onChange={this.onToggle}/>
          <i className={iconClass}></i>
          <span className={th.CategoriesList__ToggleTitle}>{title}</span>
          {children}
        </label>
      </li>
    )
  }
}

export default Toggle
