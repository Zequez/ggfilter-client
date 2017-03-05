// Automatic Request Games
function ARG (actionCreator) {
  return (...inputs) => [actionCreator(...inputs), getGames(0)]
}

// Identity Action
const IA = (type) => (payload) => ({ type, payload })
// Identity Action Multi
const IAM = (type) => (pay1, pay2) => ({ type, payload: [pay1, pay2] })

export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const SAVE = 'filter/SAVE'

export const RESET_FILTER = 'filter/RESET_FILTER'
export const SET_FILTER = 'filter/SET_FILTER'
export const setFilter = ARG(IA(SET_FILTER))
export const resetFilter = ARG(IA(RESET_FILTER))

export const SET_CONTROL = 'filter/SET_CONTROL'
export const SET_CONTROL_PARAMS = 'filter/SET_CONTROL_PARAMS'
export const setControl = ARG(IAM(SET_CONTROL))
export const addControl = (control) => setControl(control)
export const removeControl = (control) => setControl(control)
export const setControlParams = ARG(IAM(SET_CONTROL_PARAMS))

export const SET_NAME = 'filter/SET_NAME'
export const setName = IA(SET_NAME)

// export const ADD_COLUMN = 'filter/ADD_COLUMN'
// export const REMOVE_COLUMN = 'filter/REMOVE_COLUMN'
// export const SET_COLUMN_PARAMS = 'filter/SET_COLUMN_PARAMS'

export const SET_SORTING = 'filter/SET_SORTING'
export const SET_HL_MODE = 'filter/SET_HL_MODE'
export const SET_GLOBAL_CONFIG = 'filter/SET_GLOBAL_CONFIG'
export const setSorting = ARG(IAM(SET_SORTING))
export const setHlMode = IAM(SET_HL_MODE)
export const setGlobalConfig = ARG(IAM(SET_GLOBAL_CONFIG))

export const addTagFilter = (tagId) => (dispatch, getState) => {
  let tagsFilter = getState().filter.params.tags
  let newTagsFilter = {}

  if (tagsFilter) {
    if (tagsFilter.tags.indexOf(tagId) !== -1) return
    newTagsFilter.tags = tagsFilter.tags.concat([tagId])
  } else {
    newTagsFilter.tags = [tagId]
  }

  dispatch(setControlParams('tags', newTagsFilter))
}

export const GET_GAMES_REQUEST = 'filter/GET_GAMES_REQUEST'
export const GET_GAMES_SUCCESS = 'filter/GET_GAMES_SUCCESS'
export const GET_GAMES_FAILURE = 'filter/GET_GAMES_FAILURE'
export const getGames = (page) => ({type: GET_GAMES_REQUEST, payload: {page}})

export const CREATE_SFILTER_REQUEST = 'filter/CREATE_SFILTER_REQUEST'
export const CREATE_SFILTER_SUCCESS = 'filter/CREATE_SFILTER_SUCCESS'
export const CREATE_SFILTER_FAILURE = 'filter/CREATE_SFILTER_FAILURE'
export const createSfilter = (filter) =>
  ({type: CREATE_SFILTER_REQUEST, payload: {filter}})

export const UPDATE_SFILTER_REQUEST = 'filter/UPDATE_SFILTER_REQUEST'
export const UPDATE_SFILTER_SUCCESS = 'filter/UPDATE_SFILTER_SUCCESS'
export const UPDATE_SFILTER_FAILURE = 'filter/UPDATE_SFILTER_FAILURE'
export const updateSfilter = (filter, secret) =>
  ({type: UPDATE_SFILTER_REQUEST, payload: {filter, secret}})

export const SHOW_SFILTER_REQUEST = 'filter/SHOW_SFILTER_REQUEST'
export const SHOW_SFILTER_SUCCESS = 'filter/SHOW_SFILTER_SUCCESS'
export const SHOW_SFILTER_FAILURE = 'filter/SHOW_SFILTER_FAILURE'
export const showSfilter = (sid) =>
  ({type: SHOW_SFILTER_REQUEST, payload: {sid}})

// export const LOAD_FRONT_PAGE_FILTERS_REQUEST = 'filter/LOAD_FRONT_PAGE_FILTERS_REQUEST'
// export const LOAD_FRONT_PAGE_FILTERS_SUCCESS = 'filter/LOAD_FRONT_PAGE_FILTERS_SUCCESS'
// export const LOAD_FRONT_PAGE_FILTERS_FAILURE = 'filter/LOAD_FRONT_PAGE_FILTERS_FAILURE'
// export const loadFrontPageFilters = (sid) =>
//   ({type: LOAD_FRONT_PAGE_FILTERS_REQUEST, payload: null})
