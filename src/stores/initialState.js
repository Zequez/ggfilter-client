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
    'vr',
    // 'steam_thumbnail'
    'images'
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
  },
  lightbox: {
    media: [
      // 'http://cdn.akamai.steamstatic.com/steam/apps/367570/ss_063380bd66c443e5f3aab8d9059bb9481cf60f95.jpg?t=1440428576',
      // 'http://cdn.akamai.steamstatic.com/steam/apps/57300/ss_2bf5b6775bbc3857f0b607cb298885c5f3651556.jpg?t=1417769927'
    ],
    thumbnails: [
      // 'http://cdn.akamai.steamstatic.com/steam/apps/367570/ss_063380bd66c443e5f3aab8d9059bb9481cf60f95.116x65.jpg?t=1440428576',
      // 'http://cdn.akamai.steamstatic.com/steam/apps/57300/ss_2bf5b6775bbc3857f0b607cb298885c5f3651556.116x65.jpg?t=1417769927'
    ]
  }
}
