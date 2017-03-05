const ignore = ['@@router5/TRANSITION_START', '@@router5/TRANSITION_SUCCESS']

const logger = (store) => (next) => (action) => {
  if (!~ignore.indexOf(action.type)) {
    console.log('%c ACTION', 'color: green', action.type, action)
  }
  return next(action)
}

export default logger
