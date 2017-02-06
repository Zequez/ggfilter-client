import { call, select, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from 'shared/lib/Api'
import * as selectors from './selectors'

// Automatic Request Games
function ARG (actionCreator) {
  return (...inputs) => {
    let action = actionCreator(...inputs)
    action.dispatch = getGames(0)
    return action
  }
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

// export const ADD_COLUMN = 'filter/ADD_COLUMN'
// export const REMOVE_COLUMN = 'filter/REMOVE_COLUMN'
// export const SET_COLUMN_PARAMS = 'filter/SET_COLUMN_PARAMS'

export const SET_SORTING = 'filter/SET_SORTING'
export const SET_HL_MODE = 'filter/SET_HL_MODE'
export const SET_GLOBAL_CONFIG = 'filter/SET_GLOBAL_CONFIG'
export const setSorting = ARG(IAM(SET_SORTING))
export const setHlMode = ARG(IAM(SET_HL_MODE))
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

// export const GET_GAMES_REQUEST = 'filter/GET_GAMES_REQUEST'
// export const GET_GAMES_SUCCESS = 'filter/GET_GAMES_SUCCESS'
// export const GET_GAMES_FAILURE = 'filter/GET_GAMES_FAILURE'
// export function* getGames (page = 0) {
//   const filter = yield select(selectors.filterForApi)
//
//   yield put({type: GET_GAMES_REQUEST})
//   try {
//     const { data, meta } = yield call(Api.games.index, {
//       filter,
//       page,
//       limit: 50
//     })
//
//     yield put({
//       type: GET_GAMES_SUCCESS,
//       payload: {
//         games: data,
//         totalCount: Number(meta.paginationCount),
//         page: page
//       }
//     })
//   } catch (e) {
//     yield put({type: GET_GAMES_FAILURE, payload: e})
//   }
// }

// export const GET_MORE_GAMES = 'filter/GET_MORE_GAMES'
export const GET_GAMES_REQUEST = 'filter/GET_GAMES_REQUEST'
export const GET_GAMES_SUCCESS = 'filter/GET_GAMES_SUCCESS'
export const GET_GAMES_FAILURE = 'filter/GET_GAMES_FAILURE'
export const getGames = (page) => ({type: GET_GAMES_REQUEST, payload: {page}})

// function apiActions (name, callApi) {
//   const REQUEST = `${name}_REQUEST`
//   const SUCCESS = `${name}_SUCCESS`
//   const FAILURE = `${name}_FAILURE`
//   function apiActionCreator (...inputs) {
//     return (dispatch) => {
//       dispatch({type: REQUEST, payload: inputs})
//       callApi(...inputs)
//         .then((payload) => {
//           dispatch({type: SUCCESS, payload})
//         })
//         .catch((e) => {
//           dispatch({type: FAILURE, payload: e, error: true})
//         })
//     }
//   }
//
//   return [REQUEST, SUCCESS, FAILURE, apiActionCreator]
// }
//
// export const [
//   GET_GAMES_REQUEST,
//   GET_GAMES_SUCCESS,
//   GET_GAMES_FAILURE,
//   getGames
// ] = apiActions('filter/GET_GAMES', async function ({page}) {
//   return async (dispatch, getState) => {
//     const state = getState()
//     const filter = selectors.filterForApi(getState())
//     if (page === undefined) page = selectors.gamesCurrentPage(state) + 1
//     const {data, meta} = await Api.games.index({
//       filter,
//       page,
//       limit: 50
//     })
//     return {
//       games: data,
//       totalCount: Number(meta.paginationCount),
//       page: page
//     }
//   }
// })



// export async function getMoreGames () {
//   return (dispatch, getState) => {
//     const page = selectors.currentPage(getState())
//     return getGames(page)
//   }
// }

//   'filter/GET_GAMES',
//   Api.games.index,
//   function *(page) {
//     const filter = yield select(selectors.filterForApi)
//     yield
//   },
//   function ({data, meta}) {
//     return {
//       games: data,
//       totalCount: Number(meta.paginationCount),
//       page: page
//     }
//   }
// )




// export const [
//   GET_SFILTER_REQUEST,
//   GET_SFILTER_SUCCESS,
//   GET_SFILTER_FAILURE,
//   getSfilter
// ] = apiActions('filter/GET_SFILTER', Api.filters.show)
//
// export const [
//   CREATE_SFILTER_REQUEST,
//   CREATE_SFILTER_SUCCESS,
//   CREATE_SFILTER_FAILURE,
//   createSfilter
// ] = apiActions('filter/CREATE_SFILTER', function *() {
//   const filter = yield select(selectors.filter)
//   yield call(Api.filters.create, filter)
// })
//
// export const [
//   UPDATE_SFILTER_REQUEST,
//   UPDATE_SFILTER_SUCCESS,
//   UPDATE_SFILTER_FAILURE,
//   updateSfilter
// ] = apiActions('filter/UPDATE_SFILTER', function *() {
//   const filter = yield select(selectors.filter)
//   yield call(Api.filters.update, filter)
// })



















// export const GET_SFILTER_REQUEST = 'filter/GET_SFILTER_REQUEST'
// export const GET_SFILTER_SUCCESS = 'filter/GET_SFILTER_SUCCESS'
// export const GET_SFILTER_FAILURE = 'filter/GET_SFILTER_FAILURE'
// export function *getSfilter (sid) {
//   yield put({type: GET_SFILTER_REQUEST})
//   try {
//     const sfilter = yield call(Api.sfilter.show, sid)
//     yield put({type: GET_SFILTER_SUCCESS, payload: sfilter})
//   } catch (e) {
//     yield put({type: GET_SFILTER_FAILURE, payload: e})
//   }
// }

// export const CREATE_SFILTER_REQUEST = 'filter/CREATE_SFILTER_REQUEST'
// export const CREATE_SFILTER_SUCCESS = 'filter/CREATE_SFILTER_SUCCESS'
// export const CREATE_SFILTER_FAILURE = 'filter/CREATE_SFILTER_FAILURE'
// export function *createSfilter () {
//   const filter = yield select(selectors.filter)
//   yield put({type: CREATE_SFILTER_REQUEST})
//   try {
//     const sfilter = yield call(Api.sfilter.create, filter)
//     yield put({type: CREATE_SFILTER_SUCCESS, payload: sfilter})
//   } catch (e) {
//     yield put({type: CREATE_SFILTER_FAILURE, payload: e})
//   }
// }
//
// export const UPDATE_SFILTER_REQUEST = 'filter/UPDATE_SFILTER_REQUEST'
// export const UPDATE_SFILTER_SUCCESS = 'filter/UPDATE_SFILTER_SUCCESS'
// export const UPDATE_SFILTER_FAILURE = 'filter/UPDATE_SFILTER_FAILURE'
// export function *updateSfilter () {
//   const filter = yield select(selectors.filter)
//   yield put({type: UPDATE_SFILTER_REQUEST})
//   try {
//     const sfilter = yield call(Api.sfilter.update, filter)
//     yield put({type: UPDATE_SFILTER_SUCCESS, payload: sfilter})
//   } catch (e) {
//     yield put({type: UPDATE_SFILTER_FAILURE, payload: e})
//   }
// }
