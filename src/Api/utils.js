import { put, call, takeEvery } from 'redux-saga/effects'

export function requesterCreator (successType, failureType, callApi) {
  return function* ({payload: requestPayload}) {
    try {
      const payload = yield call(callApi, requestPayload)
      yield put({type: successType, payload})
    } catch (e) {
      yield put({type: failureType, payload: e, error: true})
    }
  }
}

export function watcherCreator (requestType, requester) {
  function* watchRequest () {
    yield takeEvery(requestType, requester)
  }
  return watchRequest
}

export function sagaCreator (requestType, successType, failureType, callApi) {
  const requester = requesterCreator(successType, failureType, callApi)
  return [requester, watcherCreator(requestType, requester)]
}
