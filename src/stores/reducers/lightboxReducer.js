import { SHOW_LIGHTBOX } from 'stores/actions'
var initialState = require('stores/initialState').lightbox
var update = require('react-addons-update')

export default function lightboxReducer(state = initialState, action) {
  if(action.type == SHOW_LIGHTBOX) {
    return {
      media: action.media,
      thumbnails: action.thumbnails
    }
  }
  return state
}
