export default {
  decrap: {
    title: 'Decrapify',
    params: {
      steam_reviews_count: { gt: 65 },
      steam_reviews_ratio: { gt: 95 }
    }
  },
  ptftb: {
    title: 'Playtime For The Buck',
    params: {
      playtime_median_ftb: { gt: 1.5 }
    },
    sort: {
      column: 'playtime_median_ftb',
      asc: false
    }
  },
  'on-sale': {
    title: 'On sale',
    params: {
      steam_discount: { gt: 1 }
    }
  }
}
