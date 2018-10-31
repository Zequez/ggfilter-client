import AnonFilter from './lib/AnonFilter';
import enums from '../enumColumns';
import { storesKeys } from '../storesDefinitions';
import { composeConfig } from './lib/composeConfig';
import MonoPrice from './components/cells/Prices/MonoPrice';
import { Range } from './components/controls/Range';
import PriceCtrl from './components/controls/PriceCtrl/PriceCtrl';
import DiscountCtrl from './components/controls/DiscountCtrl';
import PriceChip from './components/chips/PriceChip';
import DiscountChip from './components/chips/DiscountChip';

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
  control: PriceCtrl,
  chip: PriceChip,
  alignment: -1,
  boundInputs: { selectedStores: 'Stores' },
  width: ((_, q) => {
    let selectedStores = q['selectedStores'] && q['selectedStores']['value'].length;
    let spaces = selectedStores || storesKeys.length;
    if (spaces === 1) spaces = 0;
    return 108 + spaces * 32;
  })
});

export const Discount = new AnonFilter({
  api: 'price_discount',
  title: 'On Sale %',
  control: DiscountCtrl,
  cell: null,
  chip: DiscountChip,
  alignment: 0
});
