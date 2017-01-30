import th from './MultiPriceColumn.sass'
import React from 'react'

export default ({price, className}) => price === 0
  ? <span className={className}>Free</span>
  : (
    <span className={className}>
      <span className={th.__deco}>$</span>{(price / 100).toFixed(2)}
    </span>
  )
