import th from './MultiPrice.sass'
import React, { Component, PropTypes as t } from 'react'
import storesDefinitions from '../../../../storesDefinitions'
import enumColumns from '../../../../enumColumns'
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
    urls: t.objectOf(t.string).isRequired,
    stores: t.object
  }

  render () {
    let { prices, urls, stores } = this.props

    let lowestStores = getLowest(prices)

    let visibleStores = []
    if (stores) {
      storesDefinitions.forEach((store) => {
        if ((stores.value & enumColumns.values.Stores[store]) > 0) {
          visibleStores.push(store)
        }
      })
    }

    if (!visibleStores.length) {
      visibleStores = storesDefinitions
    }

    return (
      <div className={th.MultiPrice}>
        {visibleStores.map((store) =>
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
