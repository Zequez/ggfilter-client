import { browserHistory } from 'react-router'

const initialState = {}

const ROUTING_RECEIVE = 'ROUTING_RECEIVE'
const ROUTING_PUSH = 'ROUTING_PUSH'

export function routesProp (routesData, prop) {
  for (let i = 0; i < routesData.length; ++i) {
    if (routesData[i][prop] != null) return routesData[i][prop]
  }
}

export function receiveRoute (routingState) {
  return { type: ROUTING_RECEIVE, routingState }
}

export function push (location) {
  browserHistory.push(location)
  return { type: ROUTING_PUSH }
}

export function reducer (state = initialState, action) {
  if (action.type === ROUTING_RECEIVE) {
    let r = action.routingState

    // Extract all string-type or boolean-type route properties, to keep the state serializable
    let routesData = r.routes.map((r) => {
      let routeData = {}
      for (let prop in r) {
        if (typeof r[prop] === 'string' || typeof r[prop] === 'boolean') {
          routeData[prop] = r[prop]
        }
      }
      return routeData
    })

    state = {
      location: {
        pathname: r.location.pathname,
        query: r.location.query,
        search: r.location.search,
        hash: r.location.hash
      },
      params: r.params,
      routes: r.routes.map((r) => r.name),
      routesData: routesData
    }
  }

  return state
}
