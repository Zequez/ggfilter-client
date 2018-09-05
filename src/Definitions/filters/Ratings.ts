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
    percentiles: 'ratingsRatio',
    interpolation: (v) => `${Math.round(v * 100) / 100}%`
  }),
  alignment: -1,
  boundInputs: { stores: 'Stores' },
  width: 130
});
