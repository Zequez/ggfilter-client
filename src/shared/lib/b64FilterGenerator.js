export function encode (filterState) {
  if (typeof filterState !== 'string') {
    filterState = JSON.stringify(filterState)
  }
  return btoa(filterState).replace(/=+$/, '')
}

export function decode (base64filter) {
  try {
    return JSON.parse(atob(base64filter))
  } catch (e) {
    return null
  }
}
