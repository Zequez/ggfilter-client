import { call, select, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from 'shared/lib/Api'
import * as selectors from './selectors'
import * as a from './actions'

function apiRequesterCreator (successType, failureType, callApi) {
  return function* ({payload: requestPayload}) {
    try {
      const payload = yield call(callApi, requestPayload)
      yield put({type: successType, payload})
    } catch (e) {
      yield put({type: failureType, payload: e, error: true})
    }
  }
}

function apiSagaCreator (requestType, successType, failureType, callApi) {
  const requester = apiRequesterCreator(successType, failureType, callApi)
  function* watchRequest () {
    yield takeEvery(requestType, requester)
  }
  return [requester, watchRequest]
}

export const [gamesRequest, watchGamesRequest] = apiSagaCreator(
  a.GET_GAMES_REQUEST,
  a.GET_GAMES_SUCCESS,
  a.GET_GAMES_FAILURE,
  function* ({page}) {
    if (page === undefined) page = (yield select(selectors.gamesCurrentPage)) + 1
    const filter = yield select(selectors.filterForApi)
    const {data, meta} = yield call(Api.games.index, {
      filter,
      page,
      limit: 50
    })

    return {
      games: data,
      totalCount: Number(meta.paginationCount),
      page: page
    }
  })

export default function* sagas () {
  yield fork(watchGamesRequest)
}
