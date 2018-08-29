import definitions, { FiltersNames } from '../../Definitions';

let columns = ['Name', 'Tags', 'LowestPrice'];
let sort = 'Name';

export type FilterConfig = {
  query: {} | null;
  hl: boolean;
  column: boolean;
  sort: boolean | null;
  fineTuned: boolean;
};

export type FiltersConfiguration = {
  [key in FiltersNames]: FilterConfig;
};

function generateFiltersConfiguration () {
  let configuration = {};
  definitions.sortedFiltersNames.forEach((filterName) => {
    configuration[filterName] = {
      query: null,
      hl: false,
      column: columns.indexOf(filterName) !== -1,
      sort: (filterName === sort) ? true : null,
      fineTuned: false
    };
  });
  return <FiltersConfiguration> configuration;
}

const filter = {
  // Other params that get loaded from the DB
  sid: null,
  nameSlug: null,
  userId: null,

  // Editable params
  name: 'Name of your filter',

  configuration: generateFiltersConfiguration(),

  // controlsList: [
  //   'Name',
  //   'Tags',
  //   'RelativeReleaseDate',
  //   'Stores',
  //   'LowestPrice'

  //   // 'tags', 'released_at',
  //   // 'lowest_price', 'best_discount',
  //   // 'playtime_median', 'ratings_pct'
  // ],
  // controlsHlMode: [],
  // controlsParams: {
  //   // best_discount: {gt: 1, lt: null}
  //   // 'Name': { value: 'civ' },
  //   'Stores': { value: 3, mode: 'and' }
  // },
  // columnsList: [
  //   'Name',
  //   'Tags',
  //   'RelativeReleaseDate'
  //   // , 'tags', 'released_at',
  //   // 'lowest_price',
  //   // 'playtime_median', 'ratings_pct'
  // ],
  // columnsParams: {},
  // sorting: {
  //   // column: 'ratings_pct',
  //   column: 'Name',
  //   direction: true,
  //   nullFirst: false
  // },
  // globalConfig: {
  //   stores: ['steam', 'oculus'],
  //   currency: 'USD',
  //   region: 'US'
  // }
};

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
};
