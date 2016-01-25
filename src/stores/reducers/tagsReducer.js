import { SET_ALL_TAGS } from 'stores/actions'
var initialState = require('stores/initialState').tags

export default function tagsReducer (state = initialState, action) {
  if (action.type == SET_ALL_TAGS) {
    return action.tags
  } else {
    return state
  }
}
