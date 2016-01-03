var filtersDefinitions = require('./filtersDefinitions')

var definitions = {
  'Game info': [
    'steam_thumbnail',
    'steam_id',
    'name',
    'tags',
    'images',
    'sysreq_video_index'
  ],
  'Price': [
    'lowest_steam_price',
    'steam_discount',
  ],
  'Playtime': [
    'playtime_mean',
    'playtime_median',
    'playtime_sd',
    'playtime_rsd',
    'playtime_mean_ftb',
    'playtime_median_ftb',
  ],
  'Ratings': [
    'metacritic',
    'steam_reviews_count',
    'steam_reviews_ratio',
  ],
  'Features': [
    'features',
    'platforms',
    'players',
    'vr',
    'controller_support'
  ],
  'Other': [
    'system_requirements'
  ]
}

export default definitions
