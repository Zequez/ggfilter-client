import AnonFilter from './lib/AnonFilter';
import enums from '../enumColumns';
import { composeConfig } from './lib/composeConfig';
import { Price } from './components/cells/Price';
import { MultiPrice, MonoPrice } from './components/cells/MultiPrice';
import { Discount } from './components/cells/Discount';
import { Range } from './components/controls/Range';

const priceOptions = {
  toInput: (value) => value / 100,
  fromInput: (value) => value * 100,
  prefix: '$ ',
  focus: 'max'
};

export const LowestPrice = new AnonFilter({
  api: 'lowest_price',
  title: 'Price',
  cell: MonoPrice,
  cellInputs: {
    prices: 'prices',
    urls: 'urls'
  },
  control: composeConfig(Range, priceOptions),
  alignment: -1,
  boundInputs: { stores: 'Stores' },
  width: 130
});

export const Prices = new AnonFilter({
  api: 'prices',
  title: 'All Prices',
  control: null,
  cell: MultiPrice,
  cellInputs: {
    prices: 'prices',
    urls: 'urls'
  },
  boundInputs: { stores: 'Stores' },
  width: 130
});

export const BestDiscount = new AnonFilter({
  title: 'On Sale',
  control: composeConfig(Range, {suffix: '%', max: 100}),
  cell: null,
  alignment: 0
});
