import th from './MultiPrice.sass'
import React, { Component, PropTypes as t } from 'react'
import stores from '../../../../config/storesDefinitions'
import Price from './Price'

export function getLowest (prices) {
  let storesKeys = Object.keys(prices)
  if (storesKeys.length === 0) return []

  let lowestPrice = Infinity
  let lowestStores = []
  for (let storeName in prices) {
    let price = prices[storeName]
    let v = price.current
    if (v < lowestPrice) {
      lowestPrice = v
      lowestStores = [storeName]
    } else if (v === lowestPrice) {
      lowestStores.push(storeName)
    }
  }

  if (lowestStores.length === storesKeys.length) {
    return []
  }

  return lowestStores
}

export class MultiPrice extends Component {
  static noOverflowContainer = true

  static propTypes = {
    prices: t.objectOf(t.shape({
      current: t.number,
      regular: t.number
    })).isRequired,
    urls: t.objectOf(t.string).isRequired
  }

  render () {
    let { prices, urls } = this.props

    let lowestStores = getLowest(prices)

    return (
      <div className={th.MultiPrice}>
        {stores.map((store) =>
          <Price
            key={store}
            price={prices[store]}
            url={urls[store]}
            isLowest={!!~lowestStores.indexOf(store)}/>
        )}
      </div>
    )
  }
}
