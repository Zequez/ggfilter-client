import AnonFilter from './lib/AnonFilter';

import { composeConfig } from './lib/composeConfig';
import Pct from './components/controls/Pct';

export const RatingsRatio = new AnonFilter({
  api: 'ratings_pct',
  title: 'Ratings Ratio',
  cell: null,
  // cellInputs: {
  //   prices: 'prices',
  //   urls: 'urls'
  // },
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    pctValues: [1,2,3,4,5,6,7,8,9,10]
  }),
  alignment: -1,
  boundInputs: { stores: 'Stores' },
  width: 130
});
