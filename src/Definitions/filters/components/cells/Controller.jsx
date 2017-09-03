import th from './columns.sass'
import React, { PropTypes as t, Component } from 'react'

export class Controller extends Component {
  static propTypes = {
    value: t.number
  }

  render () {
    let { value } = this.props

    return (
      <div className={th.Controller}>
        { value === 3 ? 'Full' : value === 2 ? 'Partial' : value === 1 ? 'No' : '???' }
      </div>
    )
  }
}
