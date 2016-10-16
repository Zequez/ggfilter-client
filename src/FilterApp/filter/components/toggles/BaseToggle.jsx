import React, { Component, PropTypes as t } from 'react'

export default class FilterToggle extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    active: t.bool.isRequired,
    toggle: t.func.isRequired
  }

  toggle (status) {
    this.props.toggle(this.props.filter.name, !this.props.active)
  }

  render () {
    //console.info(`Render <BaseToggle/> ${this.props.filter.name}`)
    return (
      <li className='filter-toggle'>
        <label>
          <input
            type='checkbox'
            checked={this.props.active}
            onChange={::this.toggle}/>
          {this.props.filter.title}
        </label>
      </li>
    )
  }
}
