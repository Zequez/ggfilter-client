import th from './RatingsPct.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export const getCurrentColumn = (divisions, pct) => {
  return Math.floor(pct / (100 / divisions))
}

export default class Percentiles extends Component {
  static propTypes = {
    divisions: t.number,
    pct: t.number
  }

  render () {
    let { divisions, pct } = this.props

    let currentColumn = getCurrentColumn(divisions, pct)
    let cols = []
    for (let i = 0; i < divisions; ++i) {
      cols.push(
        <div key={i} className={cx(th.__entil, {
          [th.__entil_current]: currentColumn === i
        })}></div>
      )
    }

    return (
      <div className={th.__Percentiles}>
        {cols}
      </div>
    )
  }
}
