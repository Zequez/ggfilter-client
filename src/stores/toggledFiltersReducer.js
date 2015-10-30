import { TOGGLE_FILTER } from './actions'
var filtersSections = require('sources/filtersSectionsDefinitions')

const initialState = ['steam_id', 'steam_price', 'metascore', 'steam_reviews_count']

var filtersOrder = []
for(var section in filtersSections) {
  filtersOrder = filtersOrder.concat(filtersSections[section])
}

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
      state = filtersOrder.filter((v)=> state.indexOf(v) != -1 || action.filter == v )
    }
  }

  console.log(state)

  return state;
}

export default toggledFiltersReducer
