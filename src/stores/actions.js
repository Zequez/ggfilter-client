/*** COLUMNS WIDTH ACTIONS ***/
/*****************************/

export const COLUMNS_WIDTH_ADJUST = 'COLUMNS_WIDTH_ADJUST'
export const COLUMNS_WIDTH_CLEAR = 'COLUMNS_WIDTH_CLEAR'

export function adjustColumnWidth (name, amount) {
  return { type: COLUMNS_WIDTH_ADJUST, name, amount }
}

export function clearColumnWidth (name) {
  return { type: COLUMNS_WIDTH_ADJUST, name }
}

/*** LIGHTBOX ACTIONS ***/
/************************/

export const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX'

export function showLightbox (media, thumbnails) {
  return { type: SHOW_LIGHTBOX, media, thumbnails }
}

/***** TAGS ACTIONS *****/
/************************/

export const SET_ALL_TAGS = 'SET_ALL_TAGS'

export function setAllTags (tags) {
  return { type: SET_ALL_TAGS, tags }
}
