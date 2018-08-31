import th from './MultiPrice.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'
import Price from './Price'

import { getLowest, bestDiscountPrice, storesListFromFlag } from './helpers'

export class MonoPrice extends Component {
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
    let selectedStores = storesListFromFlag(stores && stores.value)
    let lowestStores = getLowest(prices)
    let price = bestDiscountPrice(lowestStores, prices)
    let allTheSame = lowestStores.length === selectedStores.length

    return (
      <div className={cx(th.MultiPrice, th.MultiPrice_monoprice)}>
        <Price
          price={price}
          url={selectedStores.length === 1 ? urls[lowestStores[0]] : null}
          isLowest={false}/>
        {(selectedStores.length !== 1) ? selectedStores.map((store) =>
          <Price
            key={store}
            price={prices[store]}
            url={urls[store]}
            iconMode={true}
            store={store}
            highlight={!!~lowestStores.indexOf(store) ? (allTheSame || availableInStores.length === 1 ? 0 : -1) : 1}/>
        ) : null}
      </div>
    )
  }
}
