import * as React from 'react';
import * as th from './Prices.sass';
import * as cx from 'classnames';
import { Stores } from '../../../../storesDefinitions';
import Discount from './Discount';
import DecoPrice from './DecoPrice';
import Icon from 'shared/components/Icon';
import { Price as PriceType, parsePrice } from './helpers';

type PriceProps = {
  price: PriceType,
  url: string,
  hl?: -1 | 1 | null
};

export default class Price extends React.Component<PriceProps> {

  render () {
    let { price, url, hl } = this.props;
    if (!price) return <span className={th.Price}></span>;

    let pri = parsePrice(price);

    let className = cx(th.Price, {
      [th.Price_lower]: hl === -1,
      [th.Price_higher]: hl === 1,
      [th.Price_discounted]: !!pri.discount
    });

    return <a href={url} className={className}>
      { pri.discount ? <div className={th.Price__was}>
        <Discount discount={pri.discount} />
        <DecoPrice className={th.Price__regular} price={pri.regular}/>
      </div> : null}
      <DecoPrice className={th.Price__current} price={pri.current}/>
    </a>;
  }
}
