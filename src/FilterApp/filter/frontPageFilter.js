import definitions from '../lib/definitions'

export default {
  params: definitions.normalizeParamsOrder({
    name: true,
    tags: true,
    released_at: {gt: 365 * 24 * 60 * 60, lt: 0},
    lowest_price: true,
    best_discount: true,
    playtime_median: true,
    ratings_count: { gt: 100 },
    ratings_ratio: { gt: 90 }
  }),
  sort: {
    filter: 'playtime_median',
    asc: false
  }
}
