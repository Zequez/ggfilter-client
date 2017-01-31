const initialState = {
  media: [],
  thumbnails: []
}

export const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX'

export function showLightbox (media = [], thumbnails = []) {
  return { type: SHOW_LIGHTBOX, media, thumbnails }
}

export default function reducer (state = initialState, action) {
  if (action.type === SHOW_LIGHTBOX) {
    return {
      media: action.media,
      thumbnails: action.thumbnails
    }
  }
  return state
}
