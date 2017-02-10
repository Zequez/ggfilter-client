export default {
  sfilter: null,
  sfilterError: null,
  sfilterLoading: false,

  filter: {
    // Other params that get loaded from the DB
    sid: null,
    nameSlug: null,
    userId: null,

    // Editable params
    name: 'Name of your filter',

    controlsList: [
      'name', 'tags', 'released_at',
      'lowest_price', 'best_discount',
      'playtime_median', 'ratings_pct'
    ],
    controlsHlMode: ['lowest_price'],
    controlsParams: {
      best_discount: {gt: 1, lt: null}
    },
    columnsList: [
      'name', 'tags', 'released_at',
      'lowest_price',
      'playtime_median', 'ratings_pct'
    ],
    columnsParams: {},
    sorting: {
      column: 'ratings_pct',
      direction: true,
      nullFirst: false
    },
    globalConfig: {
      stores: ['steam', 'oculus'],
      currency: 'USD',
      region: 'US'
    }
  },

  games: {
    batches: [],
    loading: false,
    error: null,
    totalCount: null
  }
}
