import { call, select, fork } from 'redux-saga/effects'
import Api, { sagaCreator } from 'src/Api'
import * as selectors from './selectors'
import * as a from './actions'

export const [gamesRequest, watchGamesRequest] = sagaCreator(
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

export const [createFilterRequest, watchCreateFilterRequest] = sagaCreator(
  a.CREATE_SFILTER_REQUEST,
  a.CREATE_SFILTER_SUCCESS,
  a.CREATE_SFILTER_FAILURE,
  function* (payload) {
    return yield call(Api.filters.create, payload)
  }
)

export const [updateFilterRequest, watchUpdateFilterRequest] = sagaCreator(
  a.UPDATE_SFILTER_REQUEST,
  a.UPDATE_SFILTER_SUCCESS,
  a.UPDATE_SFILTER_FAILURE,
  function* (payload) {
    return yield call(Api.filters.update, payload)
  }
)

export default function* sagas () {
  yield fork(watchGamesRequest)
  yield fork(watchCreateFilterRequest)
  yield fork(watchUpdateFilterRequest)
}
