import React from 'react'
import ReactDOM from 'react-dom'

import { setAllTags } from 'stores/actions'
import getStore from 'stores/AppStore'
import { getRoutes } from 'sources/routes'

import { browserHistory } from 'react-router'

var getTags = require('sources/getTags')

getTags((tags) => {
  let store = getStore()
  store.dispatch(setAllTags(tags))
  // Render the main component into the dom
  ReactDOM.render(getRoutes(store, browserHistory), document.getElementById('app'))
})