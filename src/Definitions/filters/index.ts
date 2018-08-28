import AnonFilter from './lib/AnonFilter';

import { BooleanCell } from './components/cells/BooleanCell';
import { DateCell } from './components/cells/DateCell';
import { ImagesCell } from './components/cells/ImagesCell';
import { Link } from './components/cells/Link';
import { Tags as TagsCell } from './components/cells/Tags';
import { TimeAgo } from './components/cells/TimeAgo';

import { BooleanCtrl } from './components/controls/BooleanCtrl';
import { DateRange } from './components/controls/DateRange';
import { RelativeDate } from './components/controls/RelativeDate';
import { TagsControl } from './components/controls/TagsControl/TagsControl';

export * from './Flags';
export * from './Prices';

export const Images = new AnonFilter({
  api: 'images',
  title: 'Screenshots',
  cell: ImagesCell,
  cellInputs: { images: 'images' },
  sort: undefined,
  width: 30
});

export const Thumbnail = new AnonFilter({
  api: 'thumbnail',
  title: 'Thumbnail',
  cell: ImagesCell,
  cellInputs: { thumbnail: 'thumbnail', 'images': 'images' },
  sort: undefined,
  width: 30
});

export const Name = new AnonFilter({
  api: 'name',
  title: 'Name',
  cell: Link,
  cellInputs: { text: 'name', urls: 'urls' },
  width: 150
});

export const Tags = new AnonFilter({
  api: 'tags',
  title: 'Tags',
  cell: TagsCell,
  control: TagsControl,
  boundInputs: {
    filterParams: 'Tags'
  }
});

export const RelativeReleaseDate = new AnonFilter({
  api: 'released_at',
  title: 'Released At',
  cell: TimeAgo,
  control: RelativeDate,
});

export const AbsoluteReleaseDate = new AnonFilter({
  api: 'released_at_absolute',
  title: 'Release Year',
  cell: DateCell,
  control: DateRange,
});

// export default {
//   },
//   steam_id: {
//     title: 'Steam ID',
//     control: 'Number',
//     width: 65,
//     alignment: 1
//   },
//   oculus_id: {
//     title: 'Steam ID',
//     control: 'Number',
//     width: 65,
//     alignment: 1
//   },
//   tags: {
//     title: 'Tags',
//     control: 'Tags',
//     controlOptions: {
//       tags: [] // We fill this up later, sadly
//     },
//     column: 'Tags',
//     columnActive: true,
//     columnOptions: {
//       tags: [] // We fill this up later, sadly
//     },
//     chip: 'Tags',
//     width: 150,
//     sort: false
//   },



//   // Playtime
//   /*************************************/

//   playtime_mean: {
//     title: 'Playtime avg',
//     longTitle: 'Playtime average',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
//     columnOptions: { round: 100, interpolation: '%shs' },
//     shortcuts: [
//       {gt: 1.5, lt: null},
//       {gt: 2.5, lt: null},
//       {gt: 3.5, lt: null},
//       {gt: 4.5, lt: null},
//       {gt: 6, lt: null},
//       {gt: 8, lt: null},
//       {gt: 11, lt: null},
//       {gt: 17.5, lt: null},
//       {gt: 34, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   playtime_median: {
//     title: 'Playtime median',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
//     columnOptions: { round: 100, interpolation: '%shs' },
//     shortcuts: [
//       {gt: 0.5, lt: null},
//       {gt: 1, lt: null},
//       {gt: 2, lt: null},
//       {gt: 2.5, lt: null},
//       {gt: 3, lt: null},
//       {gt: 4, lt: null},
//       {gt: 5.5, lt: null},
//       {gt: 8, lt: null},
//       {gt: 15, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   playtime_sd: {
//     title: 'Playtime σ',
//     longTitle: 'Playtime standard deviation',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
//     columnOptions: { round: 1, interpolation: '%shs' },
//     shortcuts: [
//       {gt: null, lt: 1.5},
//       {gt: null, lt: 3},
//       {gt: null, lt: 4},
//       {gt: null, lt: 6},
//       {gt: null, lt: 9},
//       {gt: null, lt: 12},
//       {gt: null, lt: 20},
//       {gt: null, lt: 35},
//       {gt: null, lt: 70}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   playtime_rsd: {
//     title: 'Playtime relative σ',
//     longTitle: 'Playtime relative standard deviation',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
//     columnOptions: { round: 1, interpolation: '%shs' },
//     shortcuts: [
//       {gt: null, lt: 70},
//       {gt: null, lt: 90},
//       {gt: null, lt: 100},
//       {gt: null, lt: 120},
//       {gt: null, lt: 135},
//       {gt: null, lt: 150},
//       {gt: null, lt: 180},
//       {gt: null, lt: 210},
//       {gt: null, lt: 280}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   playtime_mean_ftb: {
//     title: 'Playtime avg / $',
//     longTitle: 'Average playtime divided by lowest price',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs/$'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs/$', '*-*': '{s} to {e} hs/$' },
//     columnOptions: { round: 100, interpolation: '%shs/$' },
//     shortcuts: [
//       {gt: 0.3, lt: null},
//       {gt: 0.6, lt: null},
//       {gt: 0.9, lt: null},
//       {gt: 1.3, lt: null},
//       {gt: 1.7, lt: null},
//       {gt: 2.5, lt: null},
//       {gt: 3.5, lt: null},
//       {gt: 5, lt: null},
//       {gt: 8.5, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   playtime_median_ftb: {
//     title: 'Playtime median / $',
//     longTitle: 'Median playtime divided by lowest price',
//     control: 'Range',
//     controlOptions: {
//       suffix: 'hs/$'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}hs/$', '*-*': '{s} to {e} hs/$' },
//     columnOptions: { round: 100, interpolation: '%shs/$' },
//     shortcuts: [
//       {gt: 0.2, lt: null},
//       {gt: 0.3, lt: null},
//       {gt: 0.5, lt: null},
//       {gt: 0.7, lt: null},
//       {gt: 0.9, lt: null},
//       {gt: 1.3, lt: null},
//       {gt: 1.8, lt: null},
//       {gt: 2.7, lt: null},
//       {gt: 4.4, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },

//   // Ratings
//   /*************************************/

//   metacritic: {
//     title: 'Metacritic',
//     control: 'Range',
//     controlOptions: {
//       max: 100
//     },
//     chip: 'Range',
//     shortcuts: [
//       {gt: 10, lt: null},
//       {gt: 20, lt: null},
//       {gt: 30, lt: null},
//       {gt: 40, lt: null},
//       {gt: 50, lt: null},
//       {gt: 60, lt: null},
//       {gt: 70, lt: null},
//       {gt: 80, lt: null},
//       {gt: 90, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   ratings_count: {
//     title: '# Ratings',
//     longTitle: 'Ratings accross stores',
//     control: 'Range',
//     chip: 'Range',
//     shortcuts: [
//       {gt: 0, lt: 0},
//       {gt: 1, lt: null},
//       {gt: 10, lt: null},
//       {gt: 30, lt: null},
//       {gt: 50, lt: null},
//       {gt: 100, lt: null},
//       {gt: 200, lt: null},
//       {gt: 500, lt: null},
//       {gt: 1500, lt: null}
//     ],
//     width: 60,
//     alignment: 1
//   },
//   ratings_ratio: {
//     title: 'Ratings ratio',
//     longTitle: 'Ratings ratio accross stores',
//     control: 'Range',
//     controlOptions: {
//       max: 100,
//       suffix: '%'
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}%' },
//     column: 'Ratio',
//     columnInputs: { ratio: 'ratings_ratio', total: 'ratings_count' },
//     shortcuts: options.shortcuts.ratio,
//     width: 100,
//     alignment: 0
//   },
//   ratings_pct: {
//     title: 'Ratings percentile',
//     longTitle: 'Average percentiles of ratings ratio and amount',
//     control: 'Range',
//     controlOptions: {
//       max: 100,
//       min: 0
//     },
//     chip: 'Range',
//     chipOptions: { '': '{v}th' },
//     column: 'RatingsPct',
//     columnInputs: {
//       pct: 'ratings_pct',
//       count: 'ratings_count',
//       ratio: 'ratings_ratio'
//     },
//     shortcuts: options.shortcuts.percentiles,
//     width: 100,
//     alignment: 0
//   },



//   // system_requirements: {
//   //   id: 22,
//   //   title: 'System Requirements',
//   //   column: SystemReqColumn,
//   //   width: 600
//   // },
//   sysreq_index_pct: {
//     title: 'Sys.Req. Index',
//     longTitle: 'System Requirements Index (percentile)',
//     control: 'Range',
//     controlOptions: {
//       min: 0,
//       max: 100
//     },
//     chip: 'Range',
//     column: 'SysreqIndex',
//     shortcuts: [
//       {gt: null, lt: 10},
//       {gt: null, lt: 20},
//       {gt: null, lt: 30},
//       {gt: null, lt: 40},
//       {gt: null, lt: 50},
//       {gt: null, lt: 60},
//       {gt: null, lt: 70},
//       {gt: null, lt: 80},
//       {gt: null, lt: 90}
//     ],
//     width: 50,
//     alignment: 1
//   },
//   released_at: {
//     title: 'Released at',
//     longTitle: 'Released time ago',
//     control: 'RelativeDate',
//     chip: 'RelativeDate',
//     shortcuts: options.shortcuts.timeAgo,
//     column: 'TimeAgo',
//     width: 80
//   },
//   released_at_absolute: {
//     title: 'Release year',
//     longTitle: 'Precise date of release',
//     control: 'DateRange',
//     column: 'Date',
//     chip: 'DateRange',
//     columnInputs: { value: 'released_at' },
//     shortcuts: options.shortcuts.timeAbsolute,
//     sort: 'released_at',
//     width: 100,
//     alignment: 1
//   },

//   // Boolean
//   /*************************************/

//   vr_only: {
//     title: 'VR Only',
//     control: false,
//     column: 'Toggle',
//     chip: 'Toggle',
//     shortcuts: [
//       {value: true},
//       {value: false}
//     ],
//     width: 24 * 2,
//     alignment: 0
//   },
//   // sysreq_video_tokens_values: {
//   //   title: 'Sys.Req. Index Detail',
//   //   longTitle: 'System Requirements Index detailed tokens',
//   //   control: null,
//   //   column: 'SysreqTokensDetails',
//   //   sort: false,
//   //   width: 200
//   // },
//   steam_early_access: {
//     title: 'Early Access',
//     control: false,
//     column: 'Toggle',
//     chip: 'Toggle',
//     shortcuts: [
//       {value: true},
//       {value: false}
//     ],
//     width: 24 * 2,
//     alignment: 0
//   },

//   // Media
//   /*************************************/

//   images: {
//     title: 'Images',
//     control: null,
//     column: 'Images',
//     columnInputs: { 'images': 'images' },
//     sort: false
//   },
//   thumbnail: {
//     title: 'Thumbnail',
//     control: null,
//     column: 'Images',
//     columnInputs: { thumbnail: 'thumbnail', 'images': 'images' },
//     width: 120,
//     sort: false
//   },
// }
