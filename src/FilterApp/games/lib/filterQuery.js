// ###############
// !!! WARNING !!!
// ###############
// This should be extracted from ../../filter
// But it causes a circular dependency
// So we don't
// I haven't found a way to fix it yet
// This is because the filter reducer needs to call getGames
// And the games reducer requires this file
// And this file would require ../../filter
// And the index would require both the selectors, but also the reducer
//
// For now we can just imagine that FilterApp/games
// it's actually a submodule of FilterApp/filter
import * as filterSel from '../../filter/selectors'

export default function filterQuery (state, page, options) {
  let controls = filterSel.definedControlsList(state)
  let controlsParams = filterSel.controlsParams(state)
  let sorting = filterSel.sorting(state)

  let params = {}
  controls.forEach((control) => {
    params[control.name] = controlsParams[control.name] || true
  })

  let filter = {
    params: params,
    sort: {
      column: sorting.column,
      asc: !sorting.direction
    }
  }

  return {
    filter: JSON.stringify(filter),
    limit: 50,
    page: page
  }
}
