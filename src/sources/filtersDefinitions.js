var BaseToggle = require('components/toggles/BaseToggle')

var RawColumn      = require('components/columns/RawColumn')
var PriceColumn    = require('components/columns/PriceColumn')
var RatioColumn    = require('components/columns/RatioColumn')
var LinkColumn     = require('components/columns/LinkColumn')
var BooleanColumn  = require('components/columns/BooleanColumn')
var ImagesColumn   = require('components/columns/ImagesColumn')

var TextFilter    = require('components/filters/TextFilter')
var NumberFilter  = require('components/filters/NumberFilter')
var RangeFilter   = require('components/filters/RangeFilter')
var BooleanFilter = require('components/filters/BooleanFilter')
var NullFilter = require('components/filters/NullFilter')

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
    filter: RangeFilter,
    column: PriceColumn,
    columnInputs: { price: 'steam_price', was: 'steam_sale_price' },
    filterOptions: {
      range: [100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000],
      rangeLabels: ['$1', '$3', '$5', '$10', '$15', '$20', '$30', '$40', '$50', '$60']
    },
    width: 100
  },
  steam_discount: {
    title: 'Steam sale %',
    filterOptions: {
      range: [0, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      rangeLabels: ['Not on sale (0%)', 'On sale (1%)', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%']
    },
    filter: RangeFilter,
    column: RawColumn,
    columnOptions: { interpolation: '%s%' },
    width: 50
  },
  playtime_mean: {
    title: 'Playtime avg',
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_median: {
    title: 'Playtime median',
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_sd: {
    title: 'Playtime σ',
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_rsd: {
    title: 'Playtime relative σ',
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_mean_ftb: {
    title: 'Playtime avg / $',
    columnOptions: { round: 100 },
    width: 60
  },
  playtime_median_ftb: {
    title: 'Playtime median / $',
    columnOptions: { round: 100 },
    width: 60
  },
  metacritic: {
    title: 'Metacritic',
    filter: RangeFilter,
    filterOptions: { range: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
    width: 60
  },
  steam_reviews_count: {
    title: '# Steam reviews',
    filter: RangeFilter,
    filterOptions: { range: [8, 20, 35, 65, 115, 220, 420, 1020, 4250] },
    width: 60
  },
  steam_reviews_ratio: {
    title: 'Steam reviews ratio',
    filter: RangeFilter,
    filterOptions: {
      range: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99],
      rangeLabels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '95%', '98%', '99%']
    },
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
    title: 'Tags'
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
