import filtersSectionsFlatSort from './filtersSectionsFlatSort'

export default {
  visible: filtersSectionsFlatSort([
    'steam_id',
    'name',
    // 'system_requirements',
    'lowest_steam_price',
    'steam_discount',
    'playtime_median_ftb',
    // 'metacritic',
    'steam_reviews_count',
    'steam_reviews_ratio',
    'platforms',
    'players',
    'vr',
    // 'steam_thumbnail',
    'tags',
    'playtime_median',
    // 'controller_support',
    // 'images'
    // 'sysreq_index_centile',
    // 'released_at_absolute',
    'released_at'
  ]),
  params: {
    // steam_reviews_count: { gt: 65 },
    // steam_reviews_ratio: { gt: 95 },
    // platforms: { value: 3 },
    // tags: { tags: [83] },
    // lowest_steam_price: { gt: 500, lt: 6000 }
  },
  sort: 'name',
  sortAsc: false
}
