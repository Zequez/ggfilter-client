import definitions from '../lib/definitions'

export default {
  params: definitions.sortParams({
    steam_id: true,
    name: {value: 'civ'},
    system_requirements: false,
    lowest_steam_price: true,
    steam_discount: true,
    playtime_median_ftb: true,
    metacritic: false,
    steam_reviews_count: true,
    steam_reviews_ratio: { gt: 70 },
    platforms: true,
    players: true,
    vr: true,
    steam_thumbnail: false,
    tags: true,
    playtime_median: true,
    controller_support: false,
    image: false,
    sysreq_index_centile: false,
    released_at_absolute: false,
    released_at: true
  }),
  sort: {
    column: 'name',
    asc: true
  }
}
