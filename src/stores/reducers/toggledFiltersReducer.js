import { TOGGLE_FILTER } from 'stores/actions'
import { toggledFilters as initialState } from 'stores/initialState'
import filtersSectionsFlatSort from 'sources/filtersSectionsFlatSort'

const sortedInitialState = filtersSectionsFlatSort(initialState)

export default function toggledFiltersReducer(state = sortedInitialState, action) {
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
      state = filtersSectionsFlatSort(state, action.filter)
    }
  }

  return state;
}
