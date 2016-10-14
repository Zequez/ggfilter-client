export const ROUTE_CHANGE = 'ROUTE_CHANGE'

export function routeChange (route, location, stateInduced) {
  return {
    type: ROUTE_CHANGE,
    route: route,
    location: location,
    stateInduced
  }
}
