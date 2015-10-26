var tabs = ['filters', 'sources', 'feedback', 'donations']
function tab(state = 'filters', action) {
  if(action.type == 'SELECT_TAB' && tabs.indexOf(action.tab) != -1) {
    return action.tab
  }
  else {
    return state
  }
}

export default tab
