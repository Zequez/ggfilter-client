import Filter from './lib/Filter';
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

export const LowestPrice = new Filter('LowestPrice', {
  title: 'Price',
  cell: MonoPrice,
  cellInputs: {
    prices: 'prices',
    urls: 'urls'
  },
  control: composeConfig(Range, priceOptions),
  alignment: -1,
  boundInputs: { stores: 'Stores' },
  width: 65
});

export const Prices = new Filter('Prices', {
  title: 'Prices',
  cell: MultiPrice,
  cellInputs: {
    prices: 'prices',
    urls: 'urls'
  },
  boundInputs: { stores: 'Stores' },
  control: undefined
});

//   best_discount: {
//     title: 'Any discount',
//     control: 'Range',
//     controlOptions: {
//       suffix: '%',
//       max: 100
//     },
//     column: 'Discount',
//     columnOptions: { interpolation: '-%s%' },
//     chip: 'Range',
//     chipOptions: options.chips.discount,
//     shortcuts: options.shortcuts.discount,
//     width: 50,
//     alignment: 0
//   },
//   steam_price: {
//     title: 'Steam price',
//     control: 'Range',
//     controlOptions: options.controls.price,
//     column: 'Price',
//     columnInputs: { price: 'steam_price', regular: 'steam_price_regular' },
//     chip: 'Range',
//     chipOptions: options.chips.price,
//     shortcuts: options.shortcuts.price,
//     width: 100,
//     alignment: 1
//   },
//   oculus_price: {
//     title: 'Oculus price',
//     control: 'Range',
//     controlOptions: options.controls.price,
//     column: 'Price',
//     columnInputs: { price: 'oculus_price', regular: 'oculus_price_regular' },
//     chip: 'Range',
//     chipOptions: options.chips.price,
//     shortcuts: options.shortcuts.price,
//     width: 100,
//     alignment: 1
//   },
//   steam_price_discount: {
//     title: 'Steam sale',
//     control: 'Range',
//     controlOptions: {
//       suffix: '%',
//       max: 100
//     },
//     column: 'Discount',
//     columnOptions: { interpolation: '-%s%' },
//     chip: 'Range',
//     chipOptions: options.chips.discount,
//     shortcuts: options.shortcuts.discount,
//     width: 50,
//     alignment: 0
//   },
//   oculus_price_discount: {
//     title: 'Oculus sale',
//     control: 'Range',
//     controlOptions: {
//       suffix: '%',
//       max: 100
//     },
//     column: 'Discount',
//     columnOptions: { interpolation: '-%s%' },
//     chip: 'Range',
//     chipOptions: options.chips.discount,
//     shortcuts: options.shortcuts.discount,
//     width: 50,
//     alignment: 0
//   },
