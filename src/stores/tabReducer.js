import { SELECT_TAB, Tabs } from './actions'

const initialState = Tabs.FILTERS

function tabReducer(state = initialState, action) {
  if(action.type == SELECT_TAB && Tabs[action.tab]) {
    return action.tab
  }
  else {
    return state
  }
}

export default tabReducer
