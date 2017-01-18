import th from './columns'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export default class DiscountColumn extends Component {
  static propTypes = {
    value: t.number
  }

  render () {
    const { value } = this.props

    return value ? (
      <div className={th.DiscountColumn}>
        <div className={cx(th.DiscountColumn__thingy, {
          [th.DiscountColumn__thingy_low]: value < 33,
          [th.DiscountColumn__thingy_medium]: value >= 33 && value < 66,
          [th.DiscountColumn__thingy_high]: value >= 66
        })}>
          <span className={th.__deco}>-</span>
          {value}
          <span className={th.__deco}>%</span>
        </div>
      </div>
    ) : null
  }
}
