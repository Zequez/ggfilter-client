import definitions from '../lib/definitions'

export default {
  params: definitions.normalizeParamsOrder({
    name: true,
    tags: true,
    released_at: true,
    lowest_steam_price: true,
    steam_discount: true,
    playtime_median: true,
    playtime_median_ftb: true,
    steam_reviews_count: true,
    steam_reviews_ratio: true,
    platforms: true,
    players: true,
    vr: true
  }),
  sort: {
    column: 'name',
    asc: true
  }
}
