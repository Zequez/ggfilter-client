import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

export class Price extends Component {
  static propTypes = {
    price: t.number,
    was: t.number
  }

  elem (val, className) {
    return val != null ? (
      <span className={className}>
        {val > 0 ? <span><span className={th.__deco}>$</span>{(val / 100).toFixed(2)}</span> : 'Free'}
      </span>
    ) : null
  }

  render () {
    let { was, price } = this.props

    return (
      <div className={th.Price}>
        <div className={th.PriceColum__prices}>
          {this.elem(was !== price ? was : null, th.Price__PriceWas)}
          {this.elem(price, th.Price__PriceIs)}
          {price == null && was == null ? '-' : ''}
        </div>
      </div>
    )
  }
}
