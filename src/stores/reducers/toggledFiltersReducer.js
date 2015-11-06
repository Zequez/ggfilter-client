import { TOGGLE_FILTER } from 'stores/actions'
var initialState = require('stores/initialState').toggledFilters
var filtersSections = require('sources/filtersSectionsDefinitions')

var filtersOrder = []
for(var section in filtersSections) {
  filtersOrder = filtersOrder.concat(filtersSections[section])
}

function defaultOrder(currentFilters, newFilter) {
  return filtersOrder.filter((v)=> currentFilters.indexOf(v) != -1 || newFilter == v )
}

initialState = defaultOrder(initialState)

// action.filter string
// action.force boolean
function toggledFiltersReducer(state = initialState, action) {
  if (action.type == TOGGLE_FILTER) {
    var index = state.indexOf(action.filter)
    var currentlyActive = index != -1
    var useForce = !(action.force == null || action.force == undefined)
    var shouldActive = useForce ? action.force : !currentlyActive

    if(currentlyActive && !shouldActive) {
      state = state.concat([])
      state.splice(index, 1)
    }
    else if(!currentlyActive && shouldActive) {
      state = defaultOrder(state, action.filter)
    }
  }

  return state;
}

export default toggledFiltersReducer
