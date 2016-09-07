import { u } from 'lib/utils'

const initialState = {
  batchSize: 20
}

export const OPTIONS_BATCH_SIZE = 'OPTIONS_BATCH_SIZE'

export function reducer (state = initialState, action) {
  if (action.type === OPTIONS_BATCH_SIZE) {
    state = u(state, { batchSize: { $set: action.size } })
  }

  return state
}
