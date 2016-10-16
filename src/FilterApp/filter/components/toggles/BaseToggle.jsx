import React, { Component, PropTypes as t } from 'react'

export default class FilterToggle extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    active: t.bool.isRequired,
    onToggle: t.func.isRequired
  }

  onToggle = () => {
    this.props.onToggle(!this.props.active)
  }

  render () {
    let { active, filter } = this.props

    return (
      <label>
        <input
          type='checkbox'
          checked={active}
          onChange={this.onToggle}/>
        {filter.title}
      </label>
    )
  }
}
