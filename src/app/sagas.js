import { fork } from 'redux-saga/effects'
import { sagas as filterAppSagas } from '../FilterApp'

function forkAll (sagas) {
  return Object.values(sagas).map((v) => fork(v))
}

export default function* sagas () {
  yield forkAll(filterAppSagas)
}
