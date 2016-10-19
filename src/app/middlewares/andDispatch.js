export default function andDispatch ({ dispatch, getState }) {
  return next => action => {
    if (action.dispatch) {
      let andDispatch = action.dispatch
      delete action.dispatch
      dispatch(action)
      return dispatch(andDispatch)
    } else {
      return next(action)
    }
  }
}
