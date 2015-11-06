import { SELECT_TAB, Tabs } from 'stores/actions'
var initialState = require('stores/initialState').tab

function tabReducer(state = initialState, action) {
  if(action.type == SELECT_TAB && Tabs[action.tab]) {
    return action.tab
  }
  else {
    return state
  }
}

export default tabReducer
