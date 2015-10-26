var BaseToggle = require('components/toggles/BaseToggle')

export default {
  'steam_id': {
    title: 'Steam ID',
    toggle: BaseToggle,
    filter: 'ExactFilter',
    column: 'RawColumn'
  },
  'images': {
    title: 'Images',
    toggle: BaseToggle,
    filter: 'NoFilter',
    column: 'ImageColumn'
  },
  'lowest_price': {
    title: 'Lowest price',
    toggle: BaseToggle,
    filter: 'PriceFilter',
    column: 'PriceColumn'
  },
  'steam_price': {
    title: 'Steam price (US)',
    toggle: BaseToggle,
    filter: 'PriceFilter',
    column: 'PriceColumn'
  },
  'metascore': {
    title: 'Metascore',
    toggle: BaseToggle,
    filter: 'RangeFilter',
    column: 'NumberColumn'
  },
  'steam_reviews_count': {
    title: '# Steam reviews',
    toggle: BaseToggle,
    filter: 'RangeFilter',
    column: 'NumberColumn'
  },
  'multiplayer': {
    title: 'Multiplayer',
    toggle: BaseToggle,
    filter: 'BooleanFilter',
    column: 'BooleanColumn'
  },
  'single_player': {
    title: 'Single player',
    toggle: BaseToggle,
    filter: 'BooleanFilter',
    column: 'BooleanColumn'
  }
}
