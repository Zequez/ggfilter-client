import * as th from './Prices.sass';
import * as React from 'react';
import * as cx from 'classnames';

export default ({discount}) => discount ? (
  <span className={cx(th.Discount, {
    [th.Discount_low]: discount < 33,
    [th.Discount_medium]: discount >= 33 && discount < 66,
    [th.Discount_high]: discount >= 66
  })}>
    <span>-{discount}<span className={th.__deco}>%</span></span>
  </span>
) : null;
