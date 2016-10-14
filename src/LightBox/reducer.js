const initialState = {
  media: [
    // 'http://cdn.akamai.steamstatic.com/steam/apps/367570/ss_063380bd66c443e5f3aab8d9059bb9481cf60f95.jpg?t=1440428576',
    // 'http://cdn.akamai.steamstatic.com/steam/apps/57300/ss_2bf5b6775bbc3857f0b607cb298885c5f3651556.jpg?t=1417769927'
  ],
  thumbnails: [
    // 'http://cdn.akamai.steamstatic.com/steam/apps/367570/ss_063380bd66c443e5f3aab8d9059bb9481cf60f95.116x65.jpg?t=1440428576',
    // 'http://cdn.akamai.steamstatic.com/steam/apps/57300/ss_2bf5b6775bbc3857f0b607cb298885c5f3651556.116x65.jpg?t=1417769927'
  ]
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
