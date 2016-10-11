import { u } from 'lib/utils'

const initialState = {
  batchSize: 20,
  sFilterAdvancedMode: false
}

export const OPTIONS_SET_ATTR = 'OPTIONS_SET_ATTR'

export const setOption = (attr, value) => ({ type: OPTIONS_SET_ATTR, attr, value })

export function reducer (state = initialState, action) {
  switch (action.type) {
    case OPTIONS_SET_ATTR:
      state = u(state, {[action.attr]: { $set: action.value }})
      break
  }

  return state
}
