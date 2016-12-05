import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'
import Icon from 'shared/components/Icon'

export default class ToggleColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    return (
      <span className={th.ToggleColumn}>
        {this.props.value ? <Icon icon='column-check-circle'/> : null}
      </span>
    )
  }
}
