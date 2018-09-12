import * as React from 'react';
import * as th from './Prices.sass';
import * as cx from 'classnames';
import { storesKeys, Stores } from '../../../../storesDefinitions';

import Price from './Price';
import IconPrice from './IconPrice';
import { Prices, StoresPricesCalc } from './helpers';

type MonoPriceProps = {
  prices: Prices,
  urls: {[key in Stores]: string},
  selectedStores: { value: number },
  stores: number;
};

export default class MonoPrice extends React.Component<MonoPriceProps> {
  // static noOverflowContainer = true;

  render () {
    let { prices, urls, selectedStores, stores } = this.props;

    let calc = new StoresPricesCalc(stores, selectedStores, prices);

    return (
      <div className={th.MonoPrice}>
        <Price
          price={calc.lowestPrice()}
          url={calc.onlyOneStoreSelected() ? urls[calc.lowestStores()[0]] : null}/>
        {!calc.onlyOneStoreSelected() ? calc.selectedStores.map((store) =>
          <IconPrice
            key={store}
            price={prices[store]}
            url={urls[store]}
            store={store}
            hl={calc.hl(store)}/>
        ) : null}
      </div>
    );
  }
}
