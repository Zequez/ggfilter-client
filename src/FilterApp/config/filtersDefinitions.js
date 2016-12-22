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
    control: 'Null',
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
      '1-Infinity': 'Non-free',

      '1-*': '≤{ei}',
      '0-*': '≤{ei} & Free'
    },
    shortcuts: [
      {gt: null, lt: 0},
      {gt: 1, lt: null},
      {gt: 1, lt: 300},
      {gt: 1, lt: 500},
      {gt: 1, lt: 1000}
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
      '0': 'NotOnSale',
      '1->': 'On sale',
      '100': 'FREE!?'
    },
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
    width: 60,
    alignment: 1
  },
  steam_reviews_count: {
    id: 13,
    title: '# Steam reviews',
    longTitle: 'Number of Steam reviews',
    control: 'Range',
    chip: 'Range',
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
    control: 'Null',
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
    width: 50,
    alignment: 1
  },
  released_at: {
    id: 24,
    title: 'Released at',
    longTitle: 'Released time ago',
    control: 'FancyRange',
    controlOptions: options.controls.range.dateBack,
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
    control: 'Null',
    column: 'SysreqTokensDetails',
    sort: false,
    width: 200
  },
  steam_early_access: {
    id: 29,
    title: 'Early Access',
    control: 'Toggle',
    column: 'Toggle',
    width: 24 * 2,
    alignment: 0
  }
}
