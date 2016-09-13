export const logger = store => next => action => {
  console.log('%c DISPATCHING', 'color: green', action.type, action)
  let result = next(action)
  // console.log('%c STATE', 'color: green', store.getState())
  return result
}

export const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    // Raven.captureException(err, {
    //   extra: {
    //     action,
    //     state: store.getState()
    //   }
    // });
    throw err
  }
}
