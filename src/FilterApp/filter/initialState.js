const filter = {
  // Other params that get loaded from the DB
  sid: null,
  nameSlug: null,
  userId: null,

  // Editable params
  name: 'Name of your filter',

  controlsList: [
    'Name',
    'Tags',
    'RelativeReleaseDate',
    'Stores'

    // 'tags', 'released_at',
    // 'lowest_price', 'best_discount',
    // 'playtime_median', 'ratings_pct'
  ],
  controlsHlMode: [],
  controlsParams: {
    // best_discount: {gt: 1, lt: null}
    'Name': { value: 'civ' },
    'Stores': { value: 3, mode: 'or' }
  },
  columnsList: [
    'Name',
    'Tags',
    'RelativeReleaseDate'
    // , 'tags', 'released_at',
    // 'lowest_price',
    // 'playtime_median', 'ratings_pct'
  ],
  columnsParams: {},
  sorting: {
    // column: 'ratings_pct',
    column: 'Name',
    direction: true,
    nullFirst: false
  },
  globalConfig: {
    stores: ['steam', 'oculus'],
    currency: 'USD',
    region: 'US'
  }
}

export default {
  sfilter: filter,
  sfilterError: null,
  sfilterLoading: false,

  filter: filter,

  games: {
    batches: [],
    loading: false,
    error: null,
    totalCount: null
  },

  frontPageFilters: []
}
