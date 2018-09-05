import AnonFilter from './lib/AnonFilter';

import { composeConfig } from './lib/composeConfig';
import Pct from './components/controls/Pct';

const PERCENTILES_BOTH = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 75, 80, 85, 90, 95, 96, 97, 98, 99];
const PERCENTILES_HIGH = [0, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 96, 97, 98, 99];
const PERCENTILES_LOW = [0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 96, 97, 98, 99];
const PERCENTILES_CENTILES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

export const RatingsRatio = new AnonFilter({
  api: 'ratings_pct',
  title: 'Ratings Ratio',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: PERCENTILES_BOTH,
    apiPercentiles: 'ratingsRatio',
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
    percentiles: PERCENTILES_HIGH,
    apiPercentiles: 'ratingsCount'
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
    percentiles: PERCENTILES_HIGH,
    apiPercentiles: 'playtimeMedian',
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
    percentiles: PERCENTILES_LOW,
    apiPercentiles: 'playtimeSd',
    interpolation: (v) => `${Math.round(v * 10) / 10}hs`,
    sticky: 'first'
  }),
  alignment: 1,
  width: 130
});

export const SystemRequirements = new AnonFilter({
  api: 'sysreq_index_pct',
  title: 'System Requirements',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Potato',
    labelMax: 'Spaceship',
    showLabel: false,
    percentiles: PERCENTILES_CENTILES,
    apiPercentiles: 'sysreqIndex',
    sticky: 'first'
  }),
  alignment: 1,
  width: 130
});
