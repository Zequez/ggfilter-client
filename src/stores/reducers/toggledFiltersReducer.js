import { TOGGLE_FILTER } from 'stores/actions'
var initialState = require('stores/initialState').toggledFilters
var sortFlatDefinitions = require('sources/filtersSectionsFlatSort')

initialState = sortFlatDefinitions(initialState)

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
      state = sortFlatDefinitions(state, action.filter)
    }
  }

  return state;
}

export default toggledFiltersReducer
