export function encode (state) {
  let urlState = {
    toggledFilters: state.toggledFilters,
    query: state.query,
  }
  return btoa(JSON.stringify(urlState))
}

export function decode (base64filter) {
  return JSON.parse(atob(base64filter))
}
