import * as React from 'react';
import * as th from './Prices.sass';
import * as cx from 'classnames';
import { Stores } from '../../../../storesDefinitions';
import tooltipFactory from 'shared/components/Tooltip';
import Icon from 'shared/components/Icon';
import { Price, parsePrice } from './helpers';

const Att = tooltipFactory('a') as any;

type IconPriceProps = {
  price: Price,
  url: string,
  hl?: -1 | 1 | null,
  store: Stores
};

export default class IconPrice extends React.Component<IconPriceProps>  {
  render () {
    let { price, url, hl, store } = this.props;
    if (!url) return <span className={th.IconPrice}></span>;

    let className, priceText;
    if (price) {
      let pri = parsePrice(price);

      className = cx(th.IconPrice, {
        [th.IconPrice_lower]: hl === -1,
        [th.IconPrice_higher]: hl === 1,
        [th.IconPrice_discounted]: !!pri.discount
      });

      priceText = pri.discount
        ? `Was $${pri.regular}, -${pri.discount}%, is $${pri.current}`
        : `$${pri.current}`;
    } else {
      className = cx(th.IconPrice, th.IconPrice_na);
      priceText = 'Price not available';
    }

    return <Att href={url} className={className} tooltip={priceText}>
      <Icon icon={`store-${store}`}/>
    </Att>;
  }
}
