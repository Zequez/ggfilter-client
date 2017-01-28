export default {
  name: {},
  stores: {
    type: 'Stores',
    inputs: { stores: 'stores', urls: 'urls' }
  },
  released_at: {
    type: 'RelativeDate'
  },
  released_at_absolute: {
    type: 'Date',
    column: 'released_at'
  },

  steam_id: {
    type: 'Raw'
  },
  oculus_id: {
    type: 'Raw'
  },
  steam_price: {
    type: 'Price',
    inputs: { price: 'steam_price', price_regular: 'steam_price_regular' }
  },
  oculus_price: {
    type: 'Price',
    inputs: { price: 'oculus_price', price_regular: 'oculus_price_regular' }
  },
  stores_prices: {
    type: 'Prices',
    sort: 'lowest_price'
  },

  ratings_count: {
    type: 'Raw'
  },
  ratings_ratio: {
    type: 'Ratio'
  },
  ratings_pct: {
    type: 'Percentile'
  },

  tags: {
    type: 'Tags'
  },

  playtime_mean: {},
  playtime_median: {},
  playtime_rsd: {},
  playtime_mean_ftb: {},
  playtime_median_ftb: {},

  steam_early_access: { type: 'Boolean' },
  vr_only: { type: 'Boolean' },

  sysreq_index_pct: { type: 'Percentile' },

  steam_features: { type: 'Flags' },
  controller_support: { type: 'Flags' },
  platforms: { type: 'Flags' },
  players: { type: 'Flags' },
  vr_platforms: { type: 'Flags' },
  vr_mode: { type: 'Flags' },
  controllers: { type: 'Flags' },

  images: { type: 'Images' },
  thumbnail: { type: 'Thumbnail' }
}
