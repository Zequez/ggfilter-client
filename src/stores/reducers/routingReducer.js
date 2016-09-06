import { browserHistory } from 'react-router'

const initialState = {}

const ROUTING_RECEIVE = 'ROUTING_RECEIVE'
const ROUTING_PUSH = 'ROUTING_PUSH'

export function receiveRoute (routingState) {
  console.log(routingState)
  return { type: ROUTING_RECEIVE, routingState }
}

export function push (location) {
  browserHistory.push(location)
  return { type: ROUTING_PUSH }
}

export function reducer (state = initialState, action) {
  if (action.type === ROUTING_RECEIVE) {
    let r = action.routingState
    state = {
      location: {
        pathname: r.location.pathname,
        query: r.location.query,
        search: r.location.search,
        hash: r.location.hash
      },
      params: r.params,
      routes: r.routes.map((r) => r.name)

    }
  }

  return state
}
