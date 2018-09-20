import AnonFilter from './lib/AnonFilter';

import { composeConfig } from './lib/composeConfig';
import Pct from './components/controls/Pct';
import SysreqIndex from './components/cells/SysreqIndex';
import RatingsPct from './components/cells/RatingsPct/RatingsPct';
import PlaytimePct from './components/cells/PlaytimePct/PlaytimePct';
import PctChip from './components/chips/PctChip';

const PERCENTILES_BOTH = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 75, 80, 85, 90, 95, 96, 97, 98, 99];
const PERCENTILES_HIGH = [0, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 96, 97, 98, 99];
const PERCENTILES_LOW = [0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 96, 97, 98, 99];
const PERCENTILES_CENTILES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

export const RatingsRatio = new AnonFilter({
  api: 'ratings_ratio_pct',
  title: 'Ratings Ratio',
  cell: RatingsPct,
  cellInputs: { count: 'ratings_count', count_pct: 'ratings_count_pct', ratio: 'ratings_ratio', ratio_pct: 'ratings_ratio_pct' },
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: PERCENTILES_BOTH,
    apiPercentiles: 'ratingsRatio',
    interpolation: (v) => `${v}%`
  }),
  chip: PctChip,
  sort: 'ratings_ratio',
  chipConfig: {interpolation: (v) => `${v}%`, apiPercentiles: 'ratingsRatio'},
  alignment: 0,
  width: 200
});

export const RatingsCount = new AnonFilter({
  api: 'ratings_count_pct',
  title: 'Ratings Quantity',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Less',
    labelMax: 'More',
    percentiles: PERCENTILES_HIGH,
    apiPercentiles: 'ratingsCount'
  }),
  chip: PctChip,
  chipConfig: {apiPercentiles: 'ratingsCount'},
  alignment: 1,
  width: 130
});

export const Playtime = new AnonFilter({
  api: 'playtime_median_pct',
  title: 'Playtime',
  cell: PlaytimePct,
  cellInputs: {
    playtime: 'playtime_median',
    playtimePct: 'playtime_median_pct',
    disparity: 'playtime_sd',
    disparityPct: 'playtime_sd_pct',
    playtimeFtb: 'playtime_median_ftb',
    playtimeFtbPct: 'playtime_median_ftb_pct'
  },
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: PERCENTILES_HIGH,
    apiPercentiles: 'playtimeMedian',
    interpolation: (v) => `${v}hs`
  }),
  chip: PctChip,
  chipConfig: {interpolation: (v) => `${v}hs`, apiPercentiles: 'playtimeMedian'},
  alignment: 0,
  width: 220
});

export const PlaytimeDisparity = new AnonFilter({
  api: 'playtime_sd_pct', // TODO: Change
  title: 'Playtime Disparity',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: PERCENTILES_LOW,
    apiPercentiles: 'playtimeSd',
    interpolation: (v) => `${v}hs`,
    sticky: 'first'
  }),
  chip: PctChip,
  chipConfig: {lowerIsBetter: true, interpolation: (v) => `${v}hs`, apiPercentiles: 'playtimeSd'},
  alignment: 1,
  width: 130
});

export const PlaytimeForTheBuck = new AnonFilter({
  api: 'playtime_median_ftb_pct', // TODO: Change
  title: 'Playtime For The Buck',
  cell: null,
  control: composeConfig(Pct, {
    labelMin: 'Lower',
    labelMax: 'Higher',
    percentiles: PERCENTILES_HIGH,
    apiPercentiles: 'playtimeMedianFtb',
    interpolation: (v) => `${v}hs/$`,
    sticky: 'last'
  }),
  chip: PctChip,
  chipConfig: {interpolation: (v) => `${v}hs/$`, apiPercentiles: 'playtimeMedianFtb'},
  alignment: 1,
  width: 130
});

export const SystemRequirements = new AnonFilter({
  api: 'sysreq_index_pct',
  title: 'System Requirements',
  cell: SysreqIndex,
  control: composeConfig(Pct, {
    labelMin: 'Potato',
    labelMax: 'Spaceship',
    hideLabel: true,
    percentiles: PERCENTILES_CENTILES,
    apiPercentiles: 'sysreqIndex',
    sticky: 'first'
  }),
  chip: PctChip,
  chipConfig: {apiPercentiles: 'sysreqIndex'},
  alignment: 1,
  width: 130
});
