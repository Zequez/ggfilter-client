export default {
  decrapify: {
    params: {
      steam_reviews_count: { gt: 65 },
      steam_reviews_ratio: { gt: 95 }
    }
  },
  playtimeForTheBuck: {
    params: {
      playtime_median_ftb: { gt: 1.5 }
    },
    sort: 'playtime_median_ftb',
    sortAsc: false
  }
}
