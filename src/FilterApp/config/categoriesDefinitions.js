export default {
  gameInfo: {
    title: 'Game Info',
    filters: [
      'steam_thumbnail',
      'images',
      'steam_id',
      'name',
      'released_at_absolute',
      'released_at',
      'tags',
      'sysreq_index_centile'
    ]
  },
  price: {
    title: 'Price',
    filters: [
      'lowest_steam_price',
      'steam_discount'
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
      'metacritic',
      'steam_reviews_count',
      'steam_reviews_ratio'
    ]
  },
  features: {
    title: 'Features',
    filters: [
      'features',
      'platforms',
      'players',
      'controller_support'
    ]
  },
  vr: {
    title: 'VR',
    filters: [
      'vr_platforms',
      'vr_mode',
      'vr_controllers'
    ]
  }
  // 'Other': [
  //   'system_requirements'
  // ]

}
