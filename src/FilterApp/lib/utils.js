export function isQueryEmpty (query) {
  // const queryKeys = Object.keys(query)
  return typeof query !== 'object'
  // return (
  //   typeof query !== 'object' ||
  //   (queryKeys.length === 1 && queryKeys[0] === 'hl')
  // )
}

export function isQueryActive (query) {
  return query && typeof query === 'object'
}

export function isFilterEmpty (filter) {
  return Object.keys(filter.params).length + Object.keys(filter.sort).length === 0
}
