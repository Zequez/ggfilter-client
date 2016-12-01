import React, { Component, PropTypes as t } from 'react'

export default class ToggleColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    return (
      <span>
        {this.props.value ? <i className='fa icon-circle'></i> : null}
      </span>
    )
  }
}
