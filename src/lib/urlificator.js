export function encode (filterState) {
  return btoa(JSON.stringify(filterState)).replace(/=+$/, '')
}

export function decode (base64filter) {
  try {
    return JSON.parse(atob(base64filter))
  } catch (e) {
    return null
  }
}
