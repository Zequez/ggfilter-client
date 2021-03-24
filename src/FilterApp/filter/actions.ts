import { actions as routerActions } from 'redux-router5';
import { FiltersNames }  from '../../Definitions';
import { HyperFilter } from './stateTypes';
import console = require('console');
import { configurationToQuery } from './selectors';
import Api from 'src/Api';

export const MUTATE = 'filter/MUTATE';
export const RESET = 'filter/RESET';
export const SAVE = 'filter/SAVE';

export const SET_NAME = 'filter/SET_NAME';
export const setName = (name: string) => ({type: SET_NAME, payload: name});

export const SET_QUERY = 'filter/SET_QUERY';
export const setQuery = (filter: FiltersNames, query: {}) =>
  [{type: SET_QUERY, payload: [filter, query]}, saveFilter()];

export const SET_COLUMN = 'filter/SET_COLUMN';
export const setColumn = (filter: FiltersNames, column: boolean) =>
  [{type: SET_COLUMN, payload: [filter, column]}, saveFilter()];

export const SET_SORT = 'filter/SET_SORT';
export const setSort = (filter: FiltersNames, sort: boolean) =>
  [{type: SET_SORT, payload: [filter, sort]}, saveFilter()];

export const SET_HL = 'filter/SET_HL';
export const setHl = (filter: FiltersNames, hl: boolean) =>
  [{type: SET_HL, payload: [filter, hl]}, saveFilter()];

export const SET_FILTER = 'filter/SET_FILTER';
export const setFilter = (hyperFilter: HyperFilter) =>
  [{type: SET_FILTER, payload: hyperFilter}];

export const SAVE_FILTER = 'filter/SAVE_FILTER';
export const saveFilter = () => {
  return (dispatch, getState) => {
    let s = getState();
    let filter = s.filter.filter;
    let secret = s.filter.ownershipHashes[filter.sid];
    if (secret) {
      Api.filters.update(filter, secret).then(() => {
        dispatch(getGames(0));
      });
    } else {
      Api.filters.create({...filter, parentId: filter.id}).then((newFilter) => {
        dispatch(setFilter(newFilter));
        dispatch(navigateToFilter(newFilter));
        dispatch(getGames(0));
      });
    }
  };
};

export const loadFilter = (sid) => {
  return (dispatch) => {
    Api.filters.show(sid).then((filter) => {
      dispatch(setFilter(filter));
      dispatch(navigateToFilter(filter));
    });
  };
};

export const navigateToFilter = (filter: HyperFilter) => {
  if (!filter.parentId) {
    return routerActions.navigateTo('filterPlain', {});
  } else if (filter.slug) {
    return routerActions.navigateTo('filterFull', {sid: filter.sid, slug: filter.slug});
  } else {
    return routerActions.navigateTo('filterSid', {sid: filter.sid});
  }
};

export const SET_GAMES = 'filter/SET_GAMES';
export const getGames = (page: number) => {
  return (dispatch, getState) => {
    let s = getState();
    let query = configurationToQuery(s.filter.filter.configuration);
    Api.games.index({filter: query, page, limit: 50}).then(({data, meta}) => {
      dispatch({type: SET_GAMES, payload: {
        games: data,
        page: page,
        totalCount: meta['paginationCount']}
      });
    });
  };
};

// type tagsQuery = { tags: number[] };
// export const addTagFilter = (tagId: number) => (dispatch, getState) => {
//   let tagsFilter: tagsQuery = getState().filter.params.tags;
//   let newTagsFilter: tagsQuery;

//   if (tagsFilter) {
//     if (tagsFilter.tags.indexOf(tagId) !== -1) return;
//     newTagsFilter = {tags: tagsFilter.tags.concat([tagId])};
//   } else {
//     newTagsFilter = {tags: [tagId]};
//   }

//   dispatch(setQuery('Tags', newTagsFilter));
// };

// export const GET_GAMES_REQUEST = 'filter/GET_GAMES_REQUEST';
// export const GET_GAMES_SUCCESS = 'filter/GET_GAMES_SUCCESS';
// export const GET_GAMES_FAILURE = 'filter/GET_GAMES_FAILURE';
// export const getGames = (page: number) =>
//   ({type: GET_GAMES_REQUEST, payload: {page}});

// export const CREATE_SFILTER_REQUEST = 'filter/CREATE_SFILTER_REQUEST';
// export const CREATE_SFILTER_SUCCESS = 'filter/CREATE_SFILTER_SUCCESS';
// export const CREATE_SFILTER_FAILURE = 'filter/CREATE_SFILTER_FAILURE';
// export const createSfilter = (filter) =>
//   ({type: CREATE_SFILTER_REQUEST, payload: {filter}});

// export const UPDATE_SFILTER_REQUEST = 'filter/UPDATE_SFILTER_REQUEST';
// export const UPDATE_SFILTER_SUCCESS = 'filter/UPDATE_SFILTER_SUCCESS';
// export const UPDATE_SFILTER_FAILURE = 'filter/UPDATE_SFILTER_FAILURE';
// export const updateSfilter = (filter, secret) =>
//   ({type: UPDATE_SFILTER_REQUEST, payload: {filter, secret}});

// export const SHOW_SFILTER_REQUEST = 'filter/SHOW_SFILTER_REQUEST';
// export const SHOW_SFILTER_SUCCESS = 'filter/SHOW_SFILTER_SUCCESS';
// export const SHOW_SFILTER_FAILURE = 'filter/SHOW_SFILTER_FAILURE';
// export const showSfilter = (sid: string) =>
//   ({type: SHOW_SFILTER_REQUEST, payload: {sid}});

// export const LOAD_FRONT_PAGE_FILTERS_REQUEST = 'filter/LOAD_FRONT_PAGE_FILTERS_REQUEST';
// export const LOAD_FRONT_PAGE_FILTERS_SUCCESS = 'filter/LOAD_FRONT_PAGE_FILTERS_SUCCESS';
// export const LOAD_FRONT_PAGE_FILTERS_FAILURE = 'filter/LOAD_FRONT_PAGE_FILTERS_FAILURE';
// export const loadFrontPageFilters = () =>
//   ({type: LOAD_FRONT_PAGE_FILTERS_REQUEST, payload: null});
