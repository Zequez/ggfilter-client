import options from './controlsOptions'

export default {
  name: {
    id: 1,
    title: 'Name',
    column: 'Link',
    columnInputs: { text: 'name', urlValue: 'steam_id' },
    columnOptions: { urlTemplate: 'http://store.steampowered.com/app/%s/' },
    width: 150
  },
  steam_id: {
    id: 2,
    title: 'Steam ID',
    control: 'Number',
    width: 65,
    alignment: 1
  },
  images: {
    id: 3,
    title: 'Images',
    control: null,
    column: 'Images',
    columnInputs: { 'images': 'images' },
    sort: false
  },
  lowest_steam_price: {
    id: 4,
    title: 'Steam price (US)',
    control: 'Range',
    controlOptions: options.controls.range.price,
    column: 'Price',
    columnInputs: { price: 'lowest_steam_price', was: 'steam_price' },
    chip: 'Range',
    chipOptions: {
      '': (v) => '$' + Math.floor(v / 100),
      '1': '$0.01',

      '<->': 'Any price',
      '0': 'Free',
      '1-null': 'Non-free',

      '1-*': '≤{ei}',
      '0-*': '≤{ei} & Free'
    },
    shortcuts: [
      {gt: 0, lt: 0},
      {gt: 1, lt: null},
      {gt: 1, lt: 300},
      {gt: 1, lt: 500},
      {gt: 1, lt: 1000},
      {gt: 1, lt: 1500},
      {gt: 1, lt: 2000}
    ],
    width: 100,
    alignment: 1
  },
  steam_discount: {
    id: 5,
    title: 'Steam sale',
    control: 'Range',
    controlOptions: {
      suffix: '%',
      max: 100
    },
    column: 'Discount',
    columnOptions: { interpolation: '-%s%' },
    chip: 'Range',
    chipOptions: {
      '': '{v}%',
      '0': 'Not on sale',
      '1->': 'On sale',
      '100': 'FREE!?'
    },
    shortcuts: [
      {gt: 0, lt: 0},
      {gt: 1, lt: null},
      {gt: 100, lt: 100},
      {gt: 10, lt: null},
      {gt: 20, lt: null},
      {gt: 30, lt: null},
      {gt: 40, lt: null},
      {gt: 50, lt: null},
      {gt: 60, lt: null},
      {gt: 70, lt: null},
      {gt: 80, lt: null},
      {gt: 90, lt: null}
    ],
    width: 50,
    alignment: 0
  },
  playtime_mean: {
    id: 6,
    title: 'Playtime avg',
    longTitle: 'Playtime average',
    control: 'Range',
    controlOptions: {
      suffix: 'hs'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
    columnOptions: { round: 100, interpolation: '%shs' },
    shortcuts: [
      {gt: 1.5, lt: null},
      {gt: 2.5, lt: null},
      {gt: 3.5, lt: null},
      {gt: 4.5, lt: null},
      {gt: 6, lt: null},
      {gt: 8, lt: null},
      {gt: 11, lt: null},
      {gt: 17.5, lt: null},
      {gt: 34, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  playtime_median: {
    id: 7,
    title: 'Playtime median',
    control: 'Range',
    controlOptions: {
      suffix: 'hs'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
    columnOptions: { round: 100, interpolation: '%shs' },
    shortcuts: [
      {gt: 0.5, lt: null},
      {gt: 1, lt: null},
      {gt: 2, lt: null},
      {gt: 2.5, lt: null},
      {gt: 3, lt: null},
      {gt: 4, lt: null},
      {gt: 5.5, lt: null},
      {gt: 8, lt: null},
      {gt: 15, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  playtime_sd: {
    id: 8,
    title: 'Playtime σ',
    longTitle: 'Playtime standard deviation',
    control: 'Range',
    controlOptions: {
      suffix: 'hs'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
    columnOptions: { round: 1, interpolation: '%shs' },
    shortcuts: [
      {gt: null, lt: 1.5},
      {gt: null, lt: 3},
      {gt: null, lt: 4},
      {gt: null, lt: 6},
      {gt: null, lt: 9},
      {gt: null, lt: 12},
      {gt: null, lt: 20},
      {gt: null, lt: 35},
      {gt: null, lt: 70}
    ],
    width: 60,
    alignment: 1
  },
  playtime_rsd: {
    id: 9,
    title: 'Playtime relative σ',
    longTitle: 'Playtime relative standard deviation',
    control: 'Range',
    controlOptions: {
      suffix: 'hs'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs', '*-*': '{s} to {e} hs' },
    columnOptions: { round: 1, interpolation: '%shs' },
    shortcuts: [
      {gt: null, lt: 70},
      {gt: null, lt: 90},
      {gt: null, lt: 100},
      {gt: null, lt: 120},
      {gt: null, lt: 135},
      {gt: null, lt: 150},
      {gt: null, lt: 180},
      {gt: null, lt: 210},
      {gt: null, lt: 280}
    ],
    width: 60,
    alignment: 1
  },
  playtime_mean_ftb: {
    id: 10,
    title: 'Playtime avg / $',
    longTitle: 'Average playtime divided by lowest price',
    control: 'Range',
    controlOptions: {
      suffix: 'hs/$'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs/$', '*-*': '{s} to {e} hs/$' },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    shortcuts: [
      {gt: 0.3, lt: null},
      {gt: 0.6, lt: null},
      {gt: 0.9, lt: null},
      {gt: 1.3, lt: null},
      {gt: 1.7, lt: null},
      {gt: 2.5, lt: null},
      {gt: 3.5, lt: null},
      {gt: 5, lt: null},
      {gt: 8.5, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  playtime_median_ftb: {
    id: 11,
    title: 'Playtime median / $',
    longTitle: 'Median playtime divided by lowest price',
    control: 'Range',
    controlOptions: {
      suffix: 'hs/$'
    },
    chip: 'Range',
    chipOptions: { '': '{v}hs/$', '*-*': '{s} to {e} hs/$' },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    shortcuts: [
      {gt: 0.2, lt: null},
      {gt: 0.3, lt: null},
      {gt: 0.5, lt: null},
      {gt: 0.7, lt: null},
      {gt: 0.9, lt: null},
      {gt: 1.3, lt: null},
      {gt: 1.8, lt: null},
      {gt: 2.7, lt: null},
      {gt: 4.4, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  metacritic: {
    id: 12,
    title: 'Metacritic',
    control: 'Range',
    controlOptions: {
      max: 100
    },
    chip: 'Range',
    shortcuts: [
      {gt: 10, lt: null},
      {gt: 20, lt: null},
      {gt: 30, lt: null},
      {gt: 40, lt: null},
      {gt: 50, lt: null},
      {gt: 60, lt: null},
      {gt: 70, lt: null},
      {gt: 80, lt: null},
      {gt: 90, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  steam_reviews_count: {
    id: 13,
    title: '# Steam reviews',
    longTitle: 'Number of Steam reviews',
    control: 'Range',
    chip: 'Range',
    shortcuts: [
      {gt: 0, lt: 0},
      {gt: 1, lt: null},
      {gt: 10, lt: null},
      {gt: 30, lt: null},
      {gt: 50, lt: null},
      {gt: 100, lt: null},
      {gt: 200, lt: null},
      {gt: 500, lt: null},
      {gt: 1500, lt: null}
    ],
    width: 60,
    alignment: 1
  },
  steam_reviews_ratio: {
    id: 14,
    title: 'Steam reviews ratio',
    control: 'Range',
    controlOptions: {
      max: 100,
      suffix: '%'
    },
    chip: 'Range',
    chipOptions: { '': '{v}%' },
    column: 'Ratio',
    columnInputs: { ratio: 'steam_reviews_ratio', total: 'steam_reviews_count' },
    shortcuts: [
      {gt: 50, lt: null},
      {gt: 60, lt: null},
      {gt: 70, lt: null},
      {gt: 80, lt: null},
      {gt: 90, lt: null},
      {gt: 95, lt: null},
      {gt: 97, lt: null},
      {gt: 98, lt: null},
      {gt: 99, lt: null}
    ],
    width: 100,
    alignment: 0
  },
  features: {
    id: 15,
    title: 'Steam features',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 5 + 10,
    alignment: 0
  },
  platforms: {
    id: 16,
    title: 'Platforms',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 3 + 10,
    alignment: 0
  },
  players: {
    id: 17,
    title: 'Players',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 4 + 10,
    alignment: 0
  },
  vr_platforms: {
    id: 18,
    title: 'VR platforms',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 2 + 10,
    alignment: 0
  },
  controller_support: {
    id: 19,
    title: 'Controller support',
    control: 'FancyRange',
    controlOptions: {
      range: [1, 2, 3],
      label: {
        '1': 'No',
        '2': 'Partial',
        '3': 'Full'
      },
      strictlyRangeMode: false
    },
    column: 'Controller',
    alignment: 0
  },
  steam_thumbnail: {
    id: 20,
    title: 'Thumbnail',
    control: null,
    column: 'Images',
    columnInputs: { thumbnail: 'steam_thumbnail', 'images': 'images' },
    width: 120,
    sort: false
  },
  tags: {
    id: 21,
    title: 'Tags',
    control: 'Tags',
    controlOptions: {
      tags: [] // We fill this up later, sadly
    },
    column: 'Tags',
    columnActive: true,
    columnOptions: {
      tags: [] // We fill this up later, sadly
    },
    chip: 'Tags',
    width: 150,
    sort: false
  },
  // system_requirements: {
  //   id: 22,
  //   title: 'System Requirements',
  //   column: SystemReqColumn,
  //   width: 600
  // },
  sysreq_index_centile: {
    id: 23,
    title: 'Sys.Req. Index',
    longTitle: 'System Requirements Index (percentile)',
    control: 'Range',
    controlOptions: {
      min: 0,
      max: 100
    },
    chip: 'Range',
    column: 'SysreqIndex',
    shortcuts: [
      {gt: null, lt: 10},
      {gt: null, lt: 20},
      {gt: null, lt: 30},
      {gt: null, lt: 40},
      {gt: null, lt: 50},
      {gt: null, lt: 60},
      {gt: null, lt: 70},
      {gt: null, lt: 80},
      {gt: null, lt: 90}
    ],
    width: 50,
    alignment: 1
  },
  released_at: {
    id: 24,
    title: 'Released at',
    longTitle: 'Released time ago',
    control: 'FancyRange',
    controlOptions: options.controls.range.dateBack,
    shortcuts: options.shortcuts.timeAgo,
    column: 'TimeAgo',
    width: 80
  },
  released_at_absolute: {
    id: 25,
    title: 'Release year',
    longTitle: 'Precise date of release',
    control: 'FancyRange',
    controlOptions: options.controls.range.datesAbsolute,
    column: 'Date',
    columnInputs: { value: 'released_at' },
    shortcuts: options.shortcuts.timeAbsolute,
    sort: 'released_at',
    width: 100,
    alignment: 1
  },
  vr_mode: {
    id: 26,
    title: 'VR Mode',
    longTitle: 'Sitting / Standing / Room Scale',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 2 + 10,
    alignment: 0
  },
  vr_controllers: {
    id: 27,
    title: 'VR Controllers',
    control: 'Boolean',
    column: 'Boolean',
    chip: 'Boolean',
    width: 24 * 2 + 10,
    alignment: 0
  },
  sysreq_video_tokens_values: {
    id: 28,
    title: 'Sys.Req. Index Detail',
    longTitle: 'System Requirements Index detailed tokens',
    control: null,
    column: 'SysreqTokensDetails',
    sort: false,
    width: 200
  },
  steam_early_access: {
    id: 29,
    title: 'Early Access',
    control: 'Toggle',
    column: 'Toggle',
    shortcuts: [
      {value: true},
      {value: false}
    ],
    width: 24 * 2,
    alignment: 0
  }
}
