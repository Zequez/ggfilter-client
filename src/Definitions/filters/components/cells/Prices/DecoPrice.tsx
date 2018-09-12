import * as React from 'react';
import * as th from './Prices.sass';

export default ({price, className}: {price: string, className: string}) => price === '0.00'
  ? <span className={className}>Free</span>
  : (
    <span className={className}>
      <span className={th.__deco}>$</span>{price}
    </span>
  );
