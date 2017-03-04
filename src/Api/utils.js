import { put, call, takeEvery } from 'redux-saga/effects'

export function sagaCreator (requestType, successType, failureType, callApi, after) {
  return function* () {
    return yield takeEvery(requestType, function* ({payload: requestPayload}) {
      try {
        const payload = yield call(callApi, requestPayload)
        yield put({type: successType, payload})
        if (after) yield call(after, payload)
      } catch (e) {
        yield put({type: failureType, payload: e, error: true})
      }
    })
  }
}
