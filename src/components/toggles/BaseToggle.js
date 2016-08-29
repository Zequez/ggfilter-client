import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { connectActions, toggleFilter } from 'stores/actions'

class FilterToggle extends Component {
  onChange(ev) {
    this.toggleFilter(!this.props.active)
  }

  toggleFilter(status) {
    this.props.dispatch(toggleFilter(this.props.filter.name, status))
  }

  render() {
    //console.info(`Render <BaseToggle/> ${this.props.filter.name}`)
    return (
      <li className='filter-toggle'>
        <label>
          <input
            type='checkbox'
            checked={this.props.active}
            onChange={this.onChange.bind(this)}/>
          {this.props.filter.title}
        </label>
      </li>
    )
  }
}

FilterToggle.propTypes = {
  filter: t.object.isRequired,
  active: t.bool.isRequired
}

export default connect()(FilterToggle)
