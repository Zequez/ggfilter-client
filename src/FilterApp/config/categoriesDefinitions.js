export default {
  gameInfo: {
    title: 'Game Info',
    filters: [
      'thumbnail',
      'images',
      // 'steam_id',
      // 'oculus_id',
      'name',
      'released_at_absolute',
      'released_at',
      'steam_early_access',
      'tags',
      'sysreq_index_pct'
    ]
  },
  stores: {
    title: 'Stores',
    filters: [
      'stores',
      'lowest_price',
      'steam_price',
      'steam_price_discount',
      'oculus_price',
      'oculus_price_discount'
    ]
  },
  playtime: {
    title: 'Playtime',
    filters: [
      'playtime_mean',
      'playtime_median',
      'playtime_sd',
      'playtime_rsd',
      'playtime_mean_ftb',
      'playtime_median_ftb'
    ]
  },
  ratings: {
    title: 'Ratings',
    filters: [
      'ratings_count',
      'ratings_ratio'
    ]
  },
  features: {
    title: 'Features',
    filters: [
      // 'steam_features',
      'platforms',
      'players',
      'controllers'
      // 'gamepad'
    ]
  },
  vr: {
    title: 'VR',
    filters: [
      'vr_only',
      'vr_platforms',
      'vr_modes'
    ]
  }

}
