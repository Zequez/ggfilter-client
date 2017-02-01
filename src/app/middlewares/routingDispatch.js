import { LOCATION_CHANGED } from 'redux-little-router'

export default function routingDispatch ({ dispatch, getState }) {
  return next => action => {
    if (action.type === LOCATION_CHANGED) {
      if (action.payload.result.dispatch) {
        let routeAction = action.payload.result.dispatch(action.payload)
        if (routeAction) {
          dispatch(routeAction)
        }
      }
    }
    return next(action)
  }
}
