import th from './MultiPrice.sass'
import React, { Component, PropTypes as t } from 'react'
import Price from './Price'
import { getLowest, storesListFromFlag } from './helpers'

export class MultiPrice extends Component {
  static noOverflowContainer = true

  static propTypes = {
    prices: t.objectOf(t.shape({
      current: t.number,
      regular: t.number
    })).isRequired,
    urls: t.objectOf(t.string).isRequired,
    stores: t.shape({value: t.integer})
  }

  render () {
    let { prices, urls, stores } = this.props

    let availableInStores = Object.keys(prices)
    let selectedStores = storesListFromFlag(stores.value)
    let lowestStores = getLowest(prices)

    if (lowestStores.length === selectedStores.length) {
      lowestStores = []
    }

    return (
      <div className={th.MultiPrice}>
        {selectedStores.map((store) =>
          <Price
            key={store}
            price={prices[store]}
            url={urls[store]}
            highlight={!!~lowestStores.indexOf(store) ? (availableInStores.length === 1 ? 0 : -1) : 0}/>
        )}
      </div>
    )
  }
}
