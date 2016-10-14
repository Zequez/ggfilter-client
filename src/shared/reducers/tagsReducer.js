const initialState = []

export const SET_ALL_TAGS = 'SET_ALL_TAGS'

export function setAllTags (tags) {
  return { type: SET_ALL_TAGS, tags }
}

export default function tagsReducer (state = initialState, action) {
  if (action.type === SET_ALL_TAGS) {
    return action.tags
  } else {
    return state
  }
}
