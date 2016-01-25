import { SET_ALL_TAGS } from 'stores/actions'
import { tags as initialState } from 'stores/initialState'

export default function tagsReducer (state = initialState, action) {
  if (action.type == SET_ALL_TAGS) {
    return action.tags
  } else {
    return state
  }
}
