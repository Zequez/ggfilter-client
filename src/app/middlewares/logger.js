const logger = (store) => (next) => (action) => {
  console.log('%c DISPATCHING', 'color: green', action.type, action)
  let result = next(action)
  // console.log('%c STATE', 'color: green', store.getState())
  return result
}

export default logger
