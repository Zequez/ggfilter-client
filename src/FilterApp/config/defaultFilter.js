import definitions from '../lib/definitions'

export default {
  params: definitions.normalizeParamsOrder({
    name: true,
    tags: true,
    released_at: true,
    lowest_price: true,
    steam_discount: true,
    playtime_median: true,
    steam_reviews_count: true,
    steam_reviews_ratio: true
  }),
  sort: {
    filter: 'name',
    asc: true
  }
}
