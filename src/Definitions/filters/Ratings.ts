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
    pctValues: ['0%', '20%', '50%', '70%', '80%', '90%', '95%', '97.5%', '98%', '99%']
  }),
  alignment: -1,
  boundInputs: { stores: 'Stores' },
  width: 130
});
