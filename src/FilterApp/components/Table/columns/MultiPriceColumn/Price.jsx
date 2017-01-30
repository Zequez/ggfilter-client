import th from './MultiPriceColumn.sass'
import React from 'react'
import cx from 'classnames'
import Discount from './Discount'
import DecoPrice from './DecoPrice'

export default (({price, url, isLowest}) => {
  if (price) {
    let discount = Math.round(
      (price.regular - price.current) / price.regular * 100
    )

    let className = cx(th.__Price, {
      [th.__Price_lowest]: isLowest,
      [th.__Price_discounted]: discount
    })

    return (
      <a href={url} className={className}>
        <DecoPrice className={th.__current} price={price.current}/>
        { discount
          ? <DecoPrice className={th.__regular} price={price.regular}/>
          : null }
        { discount
          ? <Discount discount={discount} />
          : null }
      </a>
    )
  } else {
    return (
      <span className={th.__Price}></span>
    )
  }
})
