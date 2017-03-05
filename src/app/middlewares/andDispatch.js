export default function andDispatch ({ dispatch, getState }) {
  return next => action => {
    if (Array.isArray(action)) {
      let lastResult = null
      action.forEach((act) => lastResult = dispatch(act))
      return lastResult
    } else {
      return next(action)
    }
  }
}
