import { SELECT_TAB, Tabs } from 'stores/actions'
import { tab as initialState } from 'stores/initialState'

export default function tabReducer(state = initialState, action) {
  if(action.type == SELECT_TAB && Tabs[action.tab]) {
    return action.tab
  }
  else {
    return state
  }
}
