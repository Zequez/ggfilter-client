import definitions from '../lib/definitions'

export default {
  params: definitions.normalizeParamsOrder({
    name: true,
    tags: true,
    released_at: true,
    lowest_price: true,
    best_discount: {gt: 1, lt: null},
    playtime_median: true,
    ratings_pct: true
  }),
  sort: {
    filter: 'ratings_pct',
    asc: false
  }
}
