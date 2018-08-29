import { FiltersNames }  from '../../Definitions';

export const MUTATE = 'filter/MUTATE';
export const RESET = 'filter/RESET';
export const SAVE = 'filter/SAVE';

export const SET_NAME = 'filter/SET_NAME';
export const setName = (name: string) => ({type: SET_NAME, payload: name});

export const SET_QUERY = 'filter/SET_QUERY';
export const setQuery = (filter: FiltersNames, query: {}) =>
  [{type: SET_QUERY, payload: [filter, query]}, getGames(0)];

export const SET_COLUMN = 'filter/SET_COLUMN';
export const setColumn = (filter: FiltersNames, column: boolean) =>
  [{type: SET_COLUMN, payload: [filter, column]}, getGames(0)];

export const SET_SORT = 'filter/SET_SORT';
export const setSort = (filter: FiltersNames, sort: boolean) =>
  [{type: SET_SORT, payload: [filter, sort]}, getGames(0)];

export const SET_HL = 'filter/SET_HL';
export const setHl = (filter: FiltersNames, hl: boolean) =>
  [{type: SET_HL, payload: [filter, hl]}, getGames(0)];

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

export const GET_GAMES_REQUEST = 'filter/GET_GAMES_REQUEST';
export const GET_GAMES_SUCCESS = 'filter/GET_GAMES_SUCCESS';
export const GET_GAMES_FAILURE = 'filter/GET_GAMES_FAILURE';
export const getGames = (page: number) =>
  ({type: GET_GAMES_REQUEST, payload: {page}});

export const CREATE_SFILTER_REQUEST = 'filter/CREATE_SFILTER_REQUEST';
export const CREATE_SFILTER_SUCCESS = 'filter/CREATE_SFILTER_SUCCESS';
export const CREATE_SFILTER_FAILURE = 'filter/CREATE_SFILTER_FAILURE';
export const createSfilter = (filter) =>
  ({type: CREATE_SFILTER_REQUEST, payload: {filter}});

export const UPDATE_SFILTER_REQUEST = 'filter/UPDATE_SFILTER_REQUEST';
export const UPDATE_SFILTER_SUCCESS = 'filter/UPDATE_SFILTER_SUCCESS';
export const UPDATE_SFILTER_FAILURE = 'filter/UPDATE_SFILTER_FAILURE';
export const updateSfilter = (filter, secret) =>
  ({type: UPDATE_SFILTER_REQUEST, payload: {filter, secret}});

export const SHOW_SFILTER_REQUEST = 'filter/SHOW_SFILTER_REQUEST';
export const SHOW_SFILTER_SUCCESS = 'filter/SHOW_SFILTER_SUCCESS';
export const SHOW_SFILTER_FAILURE = 'filter/SHOW_SFILTER_FAILURE';
export const showSfilter = (sid) =>
  ({type: SHOW_SFILTER_REQUEST, payload: {sid}});

export const LOAD_FRONT_PAGE_FILTERS_REQUEST = 'filter/LOAD_FRONT_PAGE_FILTERS_REQUEST';
export const LOAD_FRONT_PAGE_FILTERS_SUCCESS = 'filter/LOAD_FRONT_PAGE_FILTERS_SUCCESS';
export const LOAD_FRONT_PAGE_FILTERS_FAILURE = 'filter/LOAD_FRONT_PAGE_FILTERS_FAILURE';
export const loadFrontPageFilters = () =>
  ({type: LOAD_FRONT_PAGE_FILTERS_REQUEST, payload: null});
