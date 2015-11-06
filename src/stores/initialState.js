import { Tabs } from './actions'

export default {
  tab: Tabs.FILTERS,

  toggledFilters: [
    'steam_id',
    'name',
    'lowest_steam_price',
    'steam_discount',
    'playtime_median_ftb',
    'metacritic',
    'steam_reviews_count'
  ],

  query: {
    filters: {
      name: { value: 'aaaaaaa', filter: true, highlight: false }
    },
    sort: 'playtime_ftb',
    sort_asc: false,
    batchSize: 20
  },

  games: {
    batches: [],
    fetching: false,
    failed: false
  }
}
