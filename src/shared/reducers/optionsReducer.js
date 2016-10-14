import { u } from 'shared/lib/utils'

function load (initialState) {
  if (typeof localStorage === 'undefined') return initialState
  let options
  try {
    options = JSON.parse(localStorage.options)
  } catch (e) {
    return initialState
  }

  return {...initialState, ...options}
}

function save (options) {
  if (localStorage) localStorage.options = JSON.stringify(options)
}

const initialState = load({
  batchSize: 20,
  sFilterAdvancedMode: false
})

export const OPTIONS_SET_ATTR = 'OPTIONS_SET_ATTR'

export const setOption = (attr, value) => ({ type: OPTIONS_SET_ATTR, attr, value })

export function reducer (state = initialState, action) {
  switch (action.type) {
    case OPTIONS_SET_ATTR:
      state = u(state, {[action.attr]: { $set: action.value }})
      save(state)
      break
  }

  return state
}
