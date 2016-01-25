import { SHOW_LIGHTBOX } from 'stores/actions'
import { lightbox as initialState } from 'stores/initialState'

export default function lightboxReducer(state = initialState, action) {
  if(action.type == SHOW_LIGHTBOX) {
    return {
      media: action.media,
      thumbnails: action.thumbnails
    }
  }
  return state
}
