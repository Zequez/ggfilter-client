import AnonFilter from './lib/AnonFilter';
import enums from '../enumColumns';
import { storesKeys } from '../storesDefinitions';
import { composeConfig } from './lib/composeConfig';
import MonoPrice from './components/cells/Prices/MonoPrice';
import { Range } from './components/controls/Range';

const priceOptions = {
  toInput: (value) => value / 100,
  fromInput: (value) => value * 100,
  prefix: '$ ',
  focus: 'max'
};

export const Price = new AnonFilter({
  api: 'price',
  title: 'Price',
  cell: MonoPrice,
  cellInputs: {
    prices: 'prices',
    urls: 'urls',
    stores: 'stores'
  },
  control: composeConfig(Range, priceOptions),
  alignment: -1,
  boundInputs: { selectedStores: 'Stores' },
  width: ((_, q) => {
    let selectedStores = q['selectedStores'] && q['selectedStores']['value']['toString'](2).replace(/0/g, '').length;
    let spaces = selectedStores || storesKeys.length;
    if (spaces === 1) spaces = 0;
    return 108 + spaces * 32;
  })
});

// export const Prices = new AnonFilter({
//   api: 'prices',
//   title: 'All Prices',
//   control: null,
//   cell: MultiPrice,
//   cellInputs: {
//     prices: 'prices',
//     urls: 'urls'
//   },
//   boundInputs: { stores: 'Stores' },
//   width: 130
// });

export const Discount = new AnonFilter({
  api: 'price_discount',
  title: 'On Sale',
  control: composeConfig(Range, {suffix: '%', max: 100}),
  cell: null,
  alignment: 0
});
