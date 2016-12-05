import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

export default class PriceColumn extends Component {
  static propTypes = {
    price: t.number,
    was: t.number
  }

  elem (val, className) {
    return val != null ? (
      <span className={className}>
        {val > 0 ? <span><span className={th.__deco}>$</span>{val / 100}</span> : 'Free'}
      </span>
    ) : null
  }

  render () {
    let { was, price } = this.props

    return (
      <div className={th.PriceColumn}>
        {this.elem(was !== price ? was : null, th.PriceColumn__PriceWas)}
        {this.elem(price, th.PriceColumn__PriceIs)}
        {price == null && was == null ? '-' : ''}
      </div>
    )
  }
}
