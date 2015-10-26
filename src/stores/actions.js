if (true) { // Dev
  var Symbol = function(key){
    return key
  }
}
else {
  var Symbol = Symbol || (function(){
    var i = 0;
    return function(){
      return (i++).toString(36)
    }
  })()
}

export const SELECT_TAB = Symbol('SELECT_TAB')

export const Tabs = {
  FILTERS: Symbol('FILTERS'),
  SOURCES: Symbol('SOURCES'),
  FEEDBACK: Symbol('FEEDBACK'),
  DONATIONS: Symbol('DONATIONS')
}

export function selectTab(tab) {
  return { type: SELECT_TAB, tab }
}
