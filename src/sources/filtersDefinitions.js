var BaseToggle = require('components/toggles/BaseToggle')
var RawColumn = require('components/columns/RawColumn')
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
    title: 'Steam price (US)'
  },
  'metacritic': {
    title: 'Metacritic'
  },
  'steam_reviews_count': {
    title: '# Steam reviews',
    filter: RangeFilter,
    column: SteamReviewsColumn,
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
  if (!filter.column) filter.column = RawColumn
}

export default filtersDefinitions
