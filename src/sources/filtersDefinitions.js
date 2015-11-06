var BaseToggle = require('components/toggles/BaseToggle')
var RawColumn = require('components/columns/RawColumn')
var PriceColumn = require('components/columns/PriceColumn')
var SteamReviewsColumn = require('components/columns/SteamReviewsColumn')
var ExactFilter = require('components/filters/ExactFilter')
var RangeFilter = require('components/filters/RangeFilter')

var filtersDefinitions = {
  'name': {
    title: 'Name'
  },
  'steam_id': {
    title: 'Steam ID'
  },
  'images': {
    title: 'Images'
  },
  'lowest_price': {
    title: 'Lowest price'
  },
  'steam_price': {
    title: 'Steam price (US)',
    filter: RangeFilter,
    column: PriceColumn,
    columnInputs: { price: 'steam_price', was: 'steam_sale_price' },
    filterOptions: {
      range: [100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000],
      rangeLabels: ['$1', '$3', '$5', '$10', '$15', '$20', '$30', '$40', '$50', '$60']
    }
  },
  'metacritic': {
    title: 'Metacritic',
    filter: RangeFilter,
    filterOptions: { range: [10, 20, 30, 40, 50, 60, 70, 80, 90] }
  },
  'steam_reviews_count': {
    title: '# Steam reviews',
    filter: RangeFilter,
    filterOptions: { range: [8, 20, 35, 65, 115, 220, 420, 1020, 4250] },
    column: SteamReviewsColumn,
    columnInputs: { up: 'positive_steam_reviews_count', down: 'negative_steam_reviews_count' },
    sort: 'steam_reviews_ratio'
  },
  'multiplayer': {
    title: 'Multiplayer'
  },
  'single_player': {
    title: 'Single player'
  }
}

for (let filterName in filtersDefinitions) {
  let filter = filtersDefinitions[filterName]
  filter.name = filterName
  if (!filter.sort) filter.sort = filter.name
  if (!filter.toggle) filter.toggle = BaseToggle
  if (!filter.filter) filter.filter = ExactFilter
  if (!filter.filterOptions) filter.filterOptions = {}
  if (!filter.column) filter.column = RawColumn
  if (!filter.columnInputs) filter.columnInputs = { value: filter.name }
}

export default filtersDefinitions
