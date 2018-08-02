import storesDefinitions from '../../../../storesDefinitions';
import enumColumns from '../../../../enumColumns';

export function getLowest (prices) {
  let storesKeys = Object.keys(prices);
  if (storesKeys.length === 0) return [];

  let lowestPrice = Infinity;
  let lowestStores = [];
  for (let storeName in prices) {
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

export function bestDiscountPrice(stores, prices) {
  if (stores.length === 1) return prices[stores[0]];

  let bestDiscountStore = stores[0];
  let bestDiscount = prices[bestDiscountStore];

  stores.forEach((store) => {
    let price = prices[store];
    if ((price.regular - price.current) / price.regular > (bestDiscount.regular - bestDiscount.current) / bestDiscount.regular) {
      bestDiscount = price;
      bestDiscountStore = store;
    }
  })

  return bestDiscount;
}

export function storesListFromFlag(storesFlag: number) {
  let stores: string[] = [];
  storesDefinitions.forEach((store) => {
    if ((storesFlag & enumColumns.values.Stores[store]) > 0) {
      stores.push(store);
    }
  });
  return stores;
}
