const { selectors: filterSel } = require('../filter')

export default function filterQuery (state, page, options) {
  let controls = filterSel.definedControlsList(state)
  let controlsParams = filterSel.controlsParams(state)
  let sorting = filterSel.sorting(state)
  let sortingColumn = filterSel.sortingColumn(state)
  let controlsHlMode = filterSel.controlsHlMode(state)

  let params = {}
  controls.forEach((control) => {
    let param = controlsParams[control.name]
    if (param && ~controlsHlMode.indexOf(control.name)) {
      param = { ...param, hl: true }
    }
    params[control.name] = param || true
  })

  let filter = {
    params: params,
    sort: {
      filter: sortingColumn.sort,
      asc: !sorting.direction
    }
  }

  return {
    filter: JSON.stringify(filter),
    limit: 50,
    page: page
  }
}
