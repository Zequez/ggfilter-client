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
    'steam_reviews_count',
    'steam_reviews_ratio',
    'platforms',
    'players',
    'vr'
  ],

  columnsWidth: {

  },

  query: {
    filters: {
      steam_reviews_count: { gt: 65 },
      steam_reviews_ratio: { gt: 95 },
      platforms: { value: 3 }
    },
    sort: 'playtime_median_ftb',
    sort_asc: false,
    batchSize: 20
  },

  games: {
    batches: [],
    fetching: false,
    failed: false,
    lastPage: false
  }
}
