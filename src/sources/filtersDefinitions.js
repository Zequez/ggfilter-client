import options from 'sources/filtersOptions'

import BaseToggle from 'components/toggles/BaseToggle'

import RawColumn from 'components/columns/RawColumn'
import PriceColumn from 'components/columns/PriceColumn'
import RatioColumn from 'components/columns/RatioColumn'
import LinkColumn from 'components/columns/LinkColumn'
import BooleanColumn from 'components/columns/BooleanColumn'
import ImagesColumn from 'components/columns/ImagesColumn'
import TagsColumn from 'components/columns/TagsColumn'
import SystemReqColumn from 'components/columns/SystemReqColumn'
import TimeAgoColumn from 'components/columns/TimeAgoColumn'

import TextFilter from 'components/filters/TextFilter'
import NumberFilter from 'components/filters/NumberFilter'
import RangeFilter from 'components/filters/RangeFilter'
import BooleanFilter from 'components/filters/BooleanFilter'
import NullFilter from 'components/filters/NullFilter'
import TagsFilter from 'components/filters/TagsFilter'
import FancyRangeFilter from 'components/filters/FancyRangeFilter'

function componentName (component) {
  return component.toString().match(/function\s*(\w+)/)[1]
}

class FilterDefinition {
  name = ''
  title = ''

  width = 100

  toggle = BaseToggle
  toggleType = null

  filter = TextFilter
  filterType = null
  filterOptions = {}

  column = RawColumn
  columnType = null
  columnActive = false
  columnInputs = null
  columnOptions = {}

  constructor (name, args) {
    this.name = name
    if (args.sort == null) this.sort = name
    if (!args.columnInputs) this.columnInputs = {value: name}

    for (let attr in args) {
      this[attr] = args[attr]
    }

    this.toggleType = componentName(this.toggle)
    this.filterType = componentName(this.filter)
    this.columnType = componentName(this.column)
  }
}

var filtersDefinitions = {
  name: {
    title: 'Name',
    column: LinkColumn,
    columnInputs: { text: 'name', urlValue: 'steam_id' },
    columnOptions: { urlTemplate: 'http://store.steampowered.com/app/%s/' },
    width: 200
  },
  steam_id: {
    title: 'Steam ID',
    filter: NumberFilter,
    width: 65
  },
  images: {
    title: 'Images',
    filter: NullFilter,
    column: ImagesColumn,
    columnInputs: { 'images': 'images' },
    sort: false
  },
  lowest_steam_price: {
    title: 'Steam price (US)',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.price,
    column: PriceColumn,
    columnInputs: { price: 'steam_price', was: 'steam_sale_price' },
    width: 100
  },
  steam_discount: {
    title: 'Steam sale %',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.discount,
    column: RawColumn,
    columnOptions: { interpolation: '%s%' },
    width: 50
  },
  playtime_mean: {
    title: 'Playtime avg',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 1.5, 3, 4, 5, 7, 9, 13, 21, 39, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_median: {
    title: 'Playtime median',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 0.7, 1.3, 1.9, 2.7, 3.5, 4.7, 6.7, 9.7, 16.6, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs' }
    },
    columnOptions: { round: 100, interpolation: '%shs' },
    width: 60
  },
  playtime_sd: {
    title: 'Playtime σ',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 1.7, 3.2, 4.9, 7.2, 10.4, 15.5, 24.2, 40.2, 76.5],
      autohook: 0,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_rsd: {
    title: 'Playtime relative σ',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 70.6, 89.7, 106.4, 122.3, 136.7, 154.9, 176.7, 209.8, 271.4],
      autohook: 0,
      label: { interpolation: '{v}hs', rangeInterpolation: '{s} to {e} hs' }
    },
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_mean_ftb: {
    title: 'Playtime avg / $',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0, 1.4, 1.9, 3.1, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs/$', rangeInterpolation: '{s} to {e} hs/$' }
    },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  playtime_median_ftb: {
    title: 'Playtime median / $',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1.5, Infinity],
      autohook: Infinity,
      label: { interpolation: '{v}hs/$', rangeInterpolation: '{s} to {e} hs/$' }
    },
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  metacritic: {
    title: 'Metacritic',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, Infinity],
      autohook: Infinity
    },
    width: 60
  },
  steam_reviews_count: {
    title: '# Steam reviews',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 8, 20, 35, 65, 115, 220, 420, 1020, 4250, Infinity],
      autohook: Infinity
    },
    width: 60
  },
  steam_reviews_ratio: {
    title: 'Steam reviews ratio',
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, Infinity],
      autohook: Infinity,
      label: {
        interpolation: '{v}%'
      }
    },
    column: RatioColumn,
    width: 100
  },
  features: {
    title: 'Steam features',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 120 + 10
  },
  platforms: {
    title: 'Platforms',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 72 + 10
  },
  players: {
    title: 'Players',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 96 + 10
  },
  vr: {
    title: 'Virtual reality',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 24 + 10
  },
  controller_support: {
    title: 'Controller support',
    filter: FancyRangeFilter,
    filterOptions: {
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
    filter: NullFilter,
    column: ImagesColumn,
    columnInputs: { thumbnail: 'steam_thumbnail', 'images': 'images' },
    width: 120,
    sort: false
  },
  tags: {
    title: 'Tags',
    filter: TagsFilter,
    filterOptions: {
      tags: [] // We fill this up later, sadly
    },
    column: TagsColumn,
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
    filter: FancyRangeFilter,
    filterOptions: {
      range: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    },
    width: 150
  },
  released_at: {
    title: 'Release date',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.dateBack,
    column: TimeAgoColumn,
    width: 100
  }
}

for (let name in filtersDefinitions) {
  filtersDefinitions[name] = new FilterDefinition(name, filtersDefinitions[name])
}

export default filtersDefinitions
