import th from './MultiPrice.sass'
import React from 'react'
import cx from 'classnames'

export default ({discount}) => discount ? (
  <span className={cx(th.__Discount, {
    [th.__Discount_low]: discount < 33,
    [th.__Discount_medium]: discount >= 33 && discount < 66,
    [th.__Discount_high]: discount >= 66
  })}>
    -{discount}<span className={th.__deco}>%</span>
  </span>
) : null
