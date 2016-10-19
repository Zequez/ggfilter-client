import options from './controlsOptions'

export default {
  name: {
    title: 'Name',
    column: 'Link',
    columnInputs: { text: 'name', urlValue: 'steam_id' },
    columnOptions: { urlTemplate: 'http://store.steampowered.com/app/%s/' },
    width: 200
  },
  steam_id: {
    title: 'Steam ID',
    control: 'Number',
    width: 65
  },
  images: {
    title: 'Images',
    control: 'Null',
    column: 'Images',
    columnInputs: { 'images': 'images' },
    sort: false
  },
  lowest_steam_price: {
    title: 'Steam price (US)',
    control: 'FancyRange',
    controlOptions: options.controls.range.price,
    column: 'Price',
    columnInputs: { price: 'steam_price', was: 'steam_sale_price' },
    width: 100
  },
  steam_discount: {
    title: 'Steam sale %',
    control: 'FancyRange',
    controlOptions: options.controls.range.discount,
    columnOptions: { interpolation: '%s%' },
    width: 50
  },
  playtime_mean: {
    title: 'Playtime avg',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 1.5, 3, 4, 5, 7, 9, 13, 21, 39, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_median: {
    title: 'Playtime median',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 0.7, 1.3, 1.9, 2.7, 3.5, 4.7, 6.7, 9.7, 16.6, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs' }
    },
    columnOptions: { round: 100, interpolation: '%shs' },
    width: 60
  },
  playtime_sd: {
    title: 'Playtime σ',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 1.7, 3.2, 4.9, 7.2, 10.4, 15.5, 24.2, 40.2, 76.5],
      autohook: 0,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_rsd: {
    title: 'Playtime relative σ',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 70.6, 89.7, 106.4, 122.3, 136.7, 154.9, 176.7, 209.8, 271.4],
      autohook: 0,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_mean_ftb: {
    title: 'Playtime avg / $',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0, 1.4, 1.9, 3.1, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs/$', rangeInterpolation: '{s} to {e} hs/$' }
    },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  playtime_median_ftb: {
    title: 'Playtime median / $',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1.5, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs/$', rangeInterpolation: '{s} to {e} hs/$' }
    },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  metacritic: {
    title: 'Metacritic',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, Infinity],
      autohook: Infinity
    },
    width: 60
  },
  steam_reviews_count: {
    title: '# Steam reviews',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 8, 20, 35, 65, 115, 220, 420, 1020, 4250, Infinity],
      autohook: Infinity
    },
    width: 60
  },
  steam_reviews_ratio: {
    title: 'Steam reviews ratio',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, Infinity],
      autohook: Infinity,
      label: {
        interpolation: '{v}%'
      }
    },
    column: 'Ratio',
    width: 100
  },
  features: {
    title: 'Steam features',
    control: 'Boolean',
    column: 'Boolean',
    width: 120 + 10
  },
  platforms: {
    title: 'Platforms',
    control: 'Boolean',
    column: 'Boolean',
    width: 72 + 10
  },
  players: {
    title: 'Players',
    control: 'Boolean',
    column: 'Boolean',
    width: 96 + 10
  },
  vr: {
    title: 'Virtual reality',
    control: 'Boolean',
    column: 'Boolean',
    width: 24 + 10
  },
  controller_support: {
    title: 'Controller support',
    control: 'FancyRange',
    controlOptions: {
      range: [1, 2, 3],
      label: {
        namedRanges: {
          '1': 'No',
          '2': 'Partial',
          '3': 'Full'
        }
      },
      strictlyRangeMode: false
    }
  },
  steam_thumbnail: {
    title: 'Thumbnail',
    control: 'Null',
    column: 'Images',
    columnInputs: { thumbnail: 'steam_thumbnail', 'images': 'images' },
    width: 120,
    sort: false
  },
  tags: {
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
    width: 200,
    sort: false
  },
  // system_requirements: {
  //   title: 'System Requirements',
  //   column: SystemReqColumn,
  //   width: 600
  // },
  sysreq_index_centile: {
    title: 'Sys.Req. Index',
    control: 'FancyRange',
    controlOptions: {
      range: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    },
    width: 150
  },
  released_at: {
    title: 'Released at',
    control: 'FancyRange',
    controlOptions: options.controls.range.dateBack,
    column: 'TimeAgo',
    width: 100
  },
  released_at_absolute: {
    title: 'Release year',
    control: 'FancyRange',
    controlOptions: options.controls.range.datesAbsolute,
    column: 'Date',
    columnInputs: { value: 'released_at' },
    sort: 'released_at',
    width: 100
  }
}
