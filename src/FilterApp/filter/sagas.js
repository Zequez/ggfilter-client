import { call, put, select, fork } from 'redux-saga/effects'
import { actions } from 'redux-router5'
import Api, { sagaCreator } from 'src/Api'
import * as selectors from './selectors'
import * as a from './actions'

export const watchGamesRequest = sagaCreator(
  a.GET_GAMES_REQUEST,
  a.GET_GAMES_SUCCESS,
  a.GET_GAMES_FAILURE,
  function* ({page}) {
    const filter = yield select(selectors.filterForApi)
    const {data, meta} = yield call(Api.games.index, {
      filter,
      page,
      limit: 50
    })

    return {
      games: data,
      totalCount: meta.paginationCount,
      page: page
    }
  })

// export const watchCreateFilterRequest = sagaCreator(
//   a.CREATE_SFILTER_REQUEST,
//   a.CREATE_SFILTER_SUCCESS,
//   a.CREATE_SFILTER_FAILURE,
//   Api.filters.create,
//   function* (f) {
//     yield put(actions.navigateTo('filterFull', {sid: f.sid, slug: f.nameSlug}))
//   }
// )

// export const watchUpdateFilterRequest = sagaCreator(
//   a.UPDATE_SFILTER_REQUEST,
//   a.UPDATE_SFILTER_SUCCESS,
//   a.UPDATE_SFILTER_FAILURE,
//   Api.filters.update
// )

// export const watchShowFilterRequest = sagaCreator(
//   a.SHOW_SFILTER_REQUEST,
//   a.SHOW_SFILTER_SUCCESS,
//   a.SHOW_SFILTER_FAILURE,
//   Api.filters.show,
//   function* () {
//     yield put(a.getGames(0))
//   }
// )

// export const watchFrontPageFilterRequest = sagaCreator(
//   a.LOAD_FRONT_PAGE_FILTERS_REQUEST,
//   a.LOAD_FRONT_PAGE_FILTERS_SUCCESS,
//   a.LOAD_FRONT_PAGE_FILTERS_FAILURE,
//   function* () {
//     return yield call(Api.filters.index, {frontPage: true})
//   },
//   function* () {
//     yield put(a.getGames(0))
//   }
// )
