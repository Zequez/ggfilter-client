import definitions from '../lib/definitions'

export default {
  params: definitions.normalizeParamsOrder({
    name: true,
    tags: true,
    released_at: {gt: 365 * 24 * 60 * 60, lt: 0},
    lowest_steam_price: true,
    steam_discount: true,
    playtime_median: true,
    steam_reviews_count: { gt: 100 },
    steam_reviews_ratio: { gt: 90 }
  }),
  sort: {
    filter: 'playtime_median',
    asc: false
  }
}
