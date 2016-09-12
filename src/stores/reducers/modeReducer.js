export const MODES = {
  columns: 'columns',
  sysreq: 'sysreq',
  sources: 'sources',
  share: 'share',
  filter: 'filter'
}

export const initialState = MODES.columns

export const MODE_SET = 'MODE_SET'

export function setMode (mode) {
  return { type: MODE_SET, mode }
}

export function reducer (state = initialState, action) {
  if (action.type === MODE_SET) {
    state = action.mode
  }

  return state
}
