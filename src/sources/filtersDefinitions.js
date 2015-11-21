var options = require('sources/filtersOptions')

var BaseToggle = require('components/toggles/BaseToggle')

var RawColumn      = require('components/columns/RawColumn')
var PriceColumn    = require('components/columns/PriceColumn')
var RatioColumn    = require('components/columns/RatioColumn')
var LinkColumn     = require('components/columns/LinkColumn')
var BooleanColumn  = require('components/columns/BooleanColumn')
var ImagesColumn   = require('components/columns/ImagesColumn')
var TagsColumn     = require('components/columns/TagsColumn')

var TextFilter        = require('components/filters/TextFilter')
var NumberFilter      = require('components/filters/NumberFilter')
var RangeFilter       = require('components/filters/RangeFilter')
var BooleanFilter     = require('components/filters/BooleanFilter')
var NullFilter        = require('components/filters/NullFilter')
var TagsFilter        = require('components/filters/TagsFilter')
var FancyRangeFilter = require('components/filters/FancyRangeFilter')

// var priceRangeOptions = {
//   range: [0, 1, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, null],
//   rangeLabels: ['Free', '$0.01', '$1', '$3', '$5', '$10', '$15', '$20', '$30', '$40', '$50', '$60', '∞'],
//   namedRanges: {
//     'Free': [0, 0],
//     'Non-free': [1, null],
//     'Any price': [0, null]
//   },
//   mappedRanges: [
//     [[0, 0],         [0, 0]],
//     [[0, 1],         [0, 0]],
//     [[null, null],   [1, null]],
//     [[1, 1],         [1, null]],
//   ]
// }

// var discountRangeOptions = {
//   range: [0, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
//   labelInterpolation: '%s%',
//   namedRanges: {
//     'NotOnSale': [0, 0],
//     'On sale':     [1, 100],
//     'Any':         [0, 100],
//     'FREE!?':      [100, 100]
//   },
//   mappedRanges: [
//     [[0, 0],     [0, 0]],
//     [[0, 1],     [0, 0]],
//     [[100, 100], [100, 100]],
//     [[1, 1],     [1, 100]],
//   ],
//   fallbackRange: [1, 100]
// }
//
// var fillRightRangeOptions = {
//   return {
//     range: [0, 1.7, 2.8, 3.9, 5.3, 7.0, 9.5, 13.3, 20.6, 38.9, null],
//     fallbackRangeTo: 'right',
//     projectFallbackMap: true
//   }
// }

var filtersDefinitions = {
  name: {
    title: 'Name',
    column: LinkColumn,
    columnInputs: { text: 'name', urlValue: 'steam_id' },
    columnOptions: { urlTemplate: 'http://store.steampowered.com/app/%s/' },
    width: 150
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
    filterOptions: options.filters.range.right([0, 1.5, 3, 4, 5, 7, 9, 13, 21, 39, null]),
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_median: {
    title: 'Playtime median',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 0.7, 1.3, 1.9, 2.7, 3.5, 4.7, 6.7, 9.7, 16.6, null]),
    columnOptions: { round: 100, interpolation: '%shs' },
    width: 60
  },
  playtime_sd: {
    title: 'Playtime σ',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 1.7, 3.2, 4.9, 7.2, 10.4, 15.5, 24.2, 40.2, 76.5, null]),
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_rsd: {
    title: 'Playtime relative σ',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 70.6, 89.7, 106.4, 122.3, 136.7, 154.9, 176.7, 209.8, 271.4, null]),
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_mean_ftb: {
    title: 'Playtime avg / $',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0, 1.4, 1.9, 3.1, null]),
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  playtime_median_ftb: {
    title: 'Playtime median / $',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1.5, null]),
    columnOptions: { round: 100, interpolation: '%shs/$' },
    width: 60
  },
  metacritic: {
    title: 'Metacritic',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, null]),
    width: 60
  },
  steam_reviews_count: {
    title: '# Steam reviews',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 8, 20, 35, 65, 115, 220, 420, 1020, 4250, null]),
    width: 60
  },
  steam_reviews_ratio: {
    title: 'Steam reviews ratio',
    filter: FancyRangeFilter,
    filterOptions: options.filters.range.right([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, null], '%s%'),
    column: RatioColumn,
    width: 100
  },
  features: {
    title: 'Steam features',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 120+10
  },
  platforms: {
    title: 'Platforms',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 72+10
  },
  players: {
    title: 'Players',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 96+10
  },
  vr: {
    title: 'Virtual reality',
    filter: BooleanFilter,
    column: BooleanColumn,
    width: 24+10
  },
  controller_support: {
    title: 'Controller support',
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
    columnOptions: {
      tags: [] // We fill this up later, sadly
    },
    width: 200,
    sort: false
  }
}

function extractName(component) {
  let str = component.toString()
  if (str.match(/function\s*Connect\(/)) {
    return extractName(component.WrappedComponent)
  }
  else {
    return str.match(/function\s*(\w+)/)[1]
  }
}

for (let filterName in filtersDefinitions) {
  let filter = filtersDefinitions[filterName]

  filter.name = filterName
  if (filter.sort == null)   filter.sort = filter.name
  if (!filter.toggle) filter.toggle = BaseToggle
  if (!filter.width)  filter.width = 100

  if (!filter.filter)        filter.filter = TextFilter
  if (!filter.filterOptions) filter.filterOptions = {}

  if (!filter.column)        filter.column = RawColumn
  if (!filter.columnInputs)  filter.columnInputs = { value: filter.name }
  if (!filter.columnOptions) filter.columnOptions = { }

  filter.toggleType = filter.toggle.toString().match(/function\s*(\w+)/)[1]
  filter.filterType = filter.filter.toString().match(/function\s*(\w+)/)[1]
  filter.columnType = extractName(filter.column)
}

export default filtersDefinitions
