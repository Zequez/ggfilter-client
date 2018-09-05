import AnonFilter from './lib/AnonFilter';

import { composeConfig } from './lib/composeConfig';
import Pct from './components/controls/Pct';

export const RatingsRatio = new AnonFilter({
  api: 'ratings_pct',
  title: 'Ratings Ratio',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: 'ratingsRatio',
    interpolation: (v) => `${Math.round(v * 100) / 100}%`
  }),
  alignment: 1,
  width: 130
});

export const RatingsCount = new AnonFilter({
  api: 'ratings_pct', // TODO: Change
  title: 'Ratings Quantity',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Less',
    labelMax: 'More',
    percentiles: 'ratingsCount'
  }),
  alignment: 1,
  width: 130
});

export const Playtime = new AnonFilter({
  api: 'ratings_pct', // TODO: Change
  title: 'Playtime',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: 'playtimeMedian',
    interpolation: (v) => `${Math.round(v * 10) / 10}hs`
  }),
  alignment: 1,
  width: 130
});

export const PlaytimeDisparity = new AnonFilter({
  api: 'ratings_pct', // TODO: Change
  title: 'Playtime Disparity',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: 'playtimeSd',
    interpolation: (v) => `${Math.round(v * 10) / 10}hs`,
    sticky: 'first'
  }),
  alignment: 1,
  width: 130
});
