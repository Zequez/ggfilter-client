var BaseToggle = require('components/toggles/BaseToggle')
var RawColumn = require('components/columns/RawColumn')
var ExactFilter = require('components/filters/ExactFilter')

export default {
  'steam_id': {
    name: 'steam_id',
    title: 'Steam ID',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'images': {
    name: 'images',
    title: 'Images',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'lowest_price': {
    name: 'lowest_price',
    title: 'Lowest price',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'steam_price': {
    name: 'steam_price',
    title: 'Steam price (US)',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'metascore': {
    name: 'metascore',
    title: 'Metascore',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'steam_reviews_count': {
    name: 'steam_reviews_count',
    title: '# Steam reviews',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'multiplayer': {
    name: 'multiplayer',
    title: 'Multiplayer',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  },
  'single_player': {
    name: 'single_player',
    title: 'Single player',
    toggle: BaseToggle,
    filter: ExactFilter,
    column: RawColumn
  }
}
