import th from './columns.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import tooltipFactory from 'shared/components/Tooltip'

const Tooltipped = tooltipFactory('span', {position: 'left'})

export default class name extends Component {
  static propTypes = {
    value: t.number
  }

  render () {
    let { value } = this.props
    let cols = []
    for (let i = 0; i < 10; ++i) {
      let active = value !== null
        ? (value > i * 10 && value <= (i + 1) * 10)
        : false

      cols.push(
        <span
          key={i}
          className={cx(th.SysreqIndexColumn__col, {
            [th.SysreqIndexColumn__col_active]: active
          })}>
        </span>
      )
    }

    const className = cx(th.SysreqIndexColumn, {
      [th.SysreqIndexColumn_unknown]: value === null
    })

    let tooltip = value === null ? 'No data' : `${value}nth percentile`

    return (
      <Tooltipped tooltip={tooltip} className={className}>
        {cols}
      </Tooltipped>
    )
  }
}
