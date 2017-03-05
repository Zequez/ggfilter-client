import { put, call, takeEvery } from 'redux-saga/effects'

export function sagaCreator (requestType, successType, failureType, callApi, after) {
  return function* () {
    return yield takeEvery(requestType, function* ({payload: requestPayload}) {
      try {
        var payload = yield call(callApi, requestPayload)
      } catch (e) {
        yield put({type: failureType, payload: e, error: true})
        return
      }

      yield put({type: successType, payload})
      if (after) yield call(after, payload)
    })
  }
}
