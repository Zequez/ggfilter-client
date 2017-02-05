// Identity Action
function IA (type, payloadProcess = p => p) {
  return (...payload) => ({ type, payload: payloadProcess(...payload) })
}

// Identity Action Multi
function IAM (type) { return IA(type, (...p) => [...p]) }

export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const SAVE = 'filter/SAVE'

export const SET_FILTER = 'filter/SET_FILTER'
export const setFilter = IA(SET_FILTER)

export const SET_CONTROL = 'filter/SET_CONTROL'
export const SET_CONTROL_PARAMS = 'filter/SET_CONTROL_PARAMS'
export const setControl = IAM(SET_CONTROL)
export const addControl = (control) => setControl(control, true)
export const removeControl = (control) => setControl(control, false)
export const setControlParams = IAM(SET_CONTROL_PARAMS)

// export const ADD_COLUMN = 'filter/ADD_COLUMN'
// export const REMOVE_COLUMN = 'filter/REMOVE_COLUMN'
// export const SET_COLUMN_PARAMS = 'filter/SET_COLUMN_PARAMS'

export const SET_SORTING = 'filter/SET_SORTING'
export const SET_HL_MODE = 'filter/SET_HL_MODE'
export const SET_GLOBAL_CONFIG = 'filter/SET_GLOBAL_CONFIG'
export const setSorting = IAM(SET_SORTING)
export const setHlMode = IAM(SET_HL_MODE)
export const setGlobalConfig = IAM(SET_GLOBAL_CONFIG)

export const addTagFilter = (tagId) => (dispatch, getState) => {
  let tagsFilter = getState().filter.params.tags
  let newTagsFilter = {}

  if (tagsFilter) {
    if (tagsFilter.tags.indexOf(tagId) !== -1) return
    newTagsFilter.tags = tagsFilter.tags.concat([tagId])
  } else {
    newTagsFilter.tags = [tagId]
  }

  dispatch(setControlParams('tags', newTagsFilter))
}
