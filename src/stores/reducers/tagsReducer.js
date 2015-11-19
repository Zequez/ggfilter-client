import { GET_TAGS_START, GET_TAGS_END } from 'stores/actions'
var initialState = require('stores/initialState').tags

export default function lightboxReducer(state = initialState, action) {
  if(action.type == GET_TAGS_END) {
    return action.tags
  }
  return state
}
