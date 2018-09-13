import { storesKeys, Stores } from '../../../../storesDefinitions';
import enumColumns from '../../../../enumColumns';

export type Price = { current: number, regular: number };
export type Prices = {[key in Stores]?: Price};

export function getLowest (prices: Prices) {
  let storesKeys = Object.keys(prices) as Stores[];
  let lowestPrice = Infinity;
  let lowestStores: Stores[] = [];

  if (storesKeys.length === 0) return lowestStores;

  let storeName: Stores;
  for (storeName in prices) {
    let price = prices[storeName];
    let v = price.current;
    if (v < lowestPrice) {
      lowestPrice = v;
      lowestStores = [storeName];
    } else if (v === lowestPrice) {
      lowestStores.push(storeName);
    }
  }

  return lowestStores;
}

export function bestDiscountPrice(stores: Stores[], prices: Prices) {
  if (stores.length === 1) return prices[stores[0]];

  let bestDiscountStore = stores[0];
  let bestDiscount = prices[bestDiscountStore];

  stores.forEach((store) => {
    let price = prices[store];
    if ((price.regular - price.current) / price.regular > (bestDiscount.regular - bestDiscount.current) / bestDiscount.regular) {
      bestDiscount = price;
      bestDiscountStore = store;
    }
  });

  return bestDiscount;
}

// export function storesListFromFlag(stores?: Stores[]) {
//   return stores || [];
//   // let stores: Stores[] = [];
//   // if (storesFlag == null) return storesKeys;
//   // storesKeys.forEach((store) => {
//   //   if ((storesFlag & enumColumns.values.Stores[store]) > 0) {
//   //     stores.push(store);
//   //   }
//   // });
//   // return stores;
// }

export function parsePrice(price: Price): {current: string, regular: string, discount: number} {
  return {
    current: (price.current / 100).toFixed(2),
    regular: (price.regular / 100).toFixed(2),
    discount: Math.round((price.regular - price.current) / price.regular * 100)
  };
}

export class StoresPricesCalc {
  stores: Stores[];
  selectedStores: Stores[];
  allPrices: Prices;

  constructor (availableStores: Stores[], selectedStoresQuery: {value: Stores[]}, allPrices: Prices) {
    this.stores = availableStores;
    this.allPrices = allPrices;
    this.selectedStores = (selectedStoresQuery && selectedStoresQuery.value) || storesKeys;
    if (!this.selectedStores.length) this.selectedStores = this.stores;
  }

  private _selectedStoresPrices: Prices;
  selectedStoresPrices () {
    if (this._selectedStoresPrices) return this._selectedStoresPrices;
    let prices: Prices = {};
    this.selectedStores.forEach((store) => {
      if (this.allPrices[store]) prices[store] = this.allPrices[store]
    });
    return ( this._selectedStoresPrices = prices );
  }

  lowestStores () {
    return getLowest(this.selectedStoresPrices());
  }

  lowestPrice () {
    return this.selectedStoresPrices()[this.lowestStores()[0]];
  }

  allStoresSamePrice () {
    return this.lowestStores().length === this.selectedStores.length;
  }

  onlyOneStoreSelected () {
    return this.selectedStores.length === 1;
  }

  hl (store) {
    if (this.allStoresSamePrice() || this.stores.length === 1) return null;
    else if (this.lowestStores().indexOf(store) === -1) return 1;
    else return -1;
  }
}
