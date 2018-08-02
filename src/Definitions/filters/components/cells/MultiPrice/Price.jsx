import th from './MultiPrice.sass'
import React from 'react'
import cx from 'classnames'
import Discount from './Discount'
import DecoPrice from './DecoPrice'
import Icon from 'shared/components/Icon'

export default (({price, url, highlight, iconMode, store}) => {
  if (price) {
    let discount = Math.round(
      (price.regular - price.current) / price.regular * 100
    )

    let className = cx(th.__Price, {
      [th.__Price_lower]: highlight === -1,
      [th.__Price_higher]: highlight === 1,
      [th.__Price_discounted]: discount,
      [th.__Price_text]: !iconMode
    })

    if (iconMode) {
      let currentPrice = (price.current / 100).toFixed(2)
      let regularPrice = (price.regular / 100).toFixed(2)

      let priceText = discount
        ? `Was $${regularPrice}, -${discount}%, is $${currentPrice}`
        : `$${currentPrice}`

      return (
        <a href={url} className={className} title={priceText}>
          <Icon icon={`store-${store}`}/>
        </a>
      )
    } else {
      let tag = {tag: url ? 'a' : 'span'}
      return (
        <tag.tag href={url} className={className}>
          <DecoPrice className={th.__current} price={price.current}/>
          { discount
            ? <DecoPrice className={th.__regular} price={price.regular}/>
            : null }
          { discount
            ? <Discount discount={discount} />
            : null }
        </tag.tag>
      )
    }
  } else {
    return (
      <span className={th.__Price}></span>
    )
  }
})
