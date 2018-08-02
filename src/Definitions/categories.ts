export default {
  gameInfo: {
    title: 'Game Info',
    filters: [
      'Thumbnail',
      'Images',
      'Name',
      'Tags',
      'RelativeReleaseDate',
      'AbsoluteReleaseDate'
      // 'steam_early_access',
      // 'sysreq_index_pct'
    ]
  },
  stores: {
    title: 'Stores',
    filters: [
      'Stores',
      'LowestPrice',
      'Prices',
      // 'Discount', // Filter only
    ]
  },
  // playtime: {
  //   title: 'Playtime',
  //   filters: [
  //     'playtime_mean',
  //     'playtime_median',
  //     'playtime_sd',
  //     'playtime_rsd',
  //     'playtime_mean_ftb',
  //     'playtime_median_ftb'
  //   ]
  // },
  // ratings: {
  //   title: 'Ratings',
  //   filters: [
  //     'ratings_pct',
  //     'ratings_count',
  //     'ratings_ratio'
  //   ]
  // },
  features: {
    title: 'Features',
    filters: [
      // 'steam_features',
      'Platforms',
      'Players',
      'Controllers'
      // 'gamepad'
    ]
  },
  vr: {
    title: 'VR',
    filters: [
      // 'vr_only',
      'VrPlatforms',
      'VrModes'
    ]
  }

}
