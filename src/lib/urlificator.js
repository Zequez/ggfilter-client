export function encode (state) {
  let urlState = {
    toggledFilters: state.toggledFilters,
    query: state.query,
  }
  return btoa(JSON.stringify(urlState))
}

export function decode (base64filter) {
  try {
    return JSON.parse(atob(base64filter))
  } catch (e) {
    return null
  }
}
