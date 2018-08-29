import { u, createReducer, combineActions as ca } from 'shared/lib/utils/store';
import * as a from './actions';
import initialState from './initialState';
import { currentSortRaw } from './selectors';

const reducers = {
  /********************/
  /* Filter stuff
  /********************/

  // [a.RESET_FILTER]: (s) => u(s, {filter: {$set: initialState.filter}}),
  [a.SET_COLUMN]: (s, [filter, column]) => u(s, {
    filter: {configuration: { [filter]: { column: { $set: column } } } }
  }),
  [a.SET_QUERY]: (s, [filter, query]) => u(s, {
    filter: {configuration: { [filter]: { query: { $set: query } } } }
  }),
  [a.SET_SORT]: (s: typeof initialState, [filter, sort]) => {
    return u(s, {
      filter: { configuration: {
        [currentSortRaw(s.filter.configuration)]: { sort: { $set: null } },
        [filter]: { sort: { $set: sort } }
      } }
    });
  },
  [a.SET_HL]: (s, [filter, hl]) => u(s, {
    filter: { configuration: { [filter]: { hl: { $set: hl } } } }
  }),

  /********************/
  /* SFilter management
  /********************/

  [a.SET_NAME]: (s, name) => u(s, {filter: {name: {$set: name}}}),

  ...ca(
    a.CREATE_SFILTER_REQUEST,
    a.UPDATE_SFILTER_REQUEST,
    a.SHOW_SFILTER_REQUEST,
    (s) => u(s, {sfilterLoading: {$set: true}})
  ),

  ...ca(
    a.CREATE_SFILTER_FAILURE,
    a.UPDATE_SFILTER_FAILURE,
    a.SHOW_SFILTER_FAILURE,
    (s, error) => u(s, {
      sfilterLoading: {$set: false},
      sfilterError: {$set: error}
    })
  ),

  ...ca(
    a.UPDATE_SFILTER_SUCCESS,
    a.SHOW_SFILTER_SUCCESS,
    (s, filter) => u(s, {
      sfilter: {$set: filter},
      sfilterError: {$set: null},
      sfilterLoading: {$set: false},
      filter: {$set: filter}
    })
  ),

  [a.CREATE_SFILTER_SUCCESS]: (s, filter) => {
    // This is a little unconventional but, whatever
    let secretString = window.localStorage.getItem('secrets');
    let secrets = secretString ? <object>JSON.parse(secretString) : {};
    secrets[filter.sid] = filter.secret;
    window.localStorage.setItem('secrets', JSON.stringify(secrets));

    return reducers[a.UPDATE_SFILTER_SUCCESS](s, filter);
  },

  /********************/
  /* Front Page Filters
  /********************/

  [a.LOAD_FRONT_PAGE_FILTERS_SUCCESS]: (s, filters) => filters.length ? u(s, {
    sfilter: {$set: filters[0]},
    filter: {$set: filters[0]},
    frontPageFilters: {$set: filters}
  }) : s,

  /********************/
  /* Games
  /********************/

  [a.GET_GAMES_REQUEST]: (s, {page}) =>
    u(s, {games: {
      loading: {$set: true},
      totalCount: {$set: page === 0 ? null : s.games.totalCount}
    }}),
  [a.GET_GAMES_SUCCESS]: (s: typeof initialState, {games, page, totalCount}) => {
    let stateChange = {games: {
      loading: {$set: false},
      error: {$set: null},
      totalCount: {$set: totalCount},
      batches: {}
    }};
    if (page === 0) {
      stateChange.games.batches = {$set: [games]};
    } else {
      stateChange.games.batches = {$splice: [[page, 0, games]]};
    }
    return u(s, stateChange);
  },
  [a.GET_GAMES_FAILURE]: (s, error) => u(s, {
    games: {
      loading: {$set: false},
      error: {$set: error},
      totalCount: {$set: 0},
      batches: {$set: []}
    }
  })
};

export default createReducer(initialState, reducers);
