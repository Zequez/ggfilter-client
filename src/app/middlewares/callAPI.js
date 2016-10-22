import { camelizeKeys } from 'shared/lib/utils'

export default function callAPIMiddleware ({ dispatch, getState }) {
  return next => action => {
    if (!action) return action

    if (!action.types) {
      // Normal action: pass it on
      return next(action)
    }

    const {
      types,
      callAPI,
      condition,
      after,
      autoCamelize,
      payload = {}
    } = action

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    let state = getState()

    if (condition && !condition(state)) {
      return
    }

    const [ requestType, successType, failureType ] = types

    dispatch({...payload, type: requestType})

    return callAPI(state).then(
      response => {
        if (autoCamelize) response = camelizeKeys(response)
        let afterPromise
        if (after) afterPromise = after(response, state, dispatch)
        let result = dispatch({...payload, response, type: successType})
        return afterPromise || result
      },
      error => dispatch({...payload, error, type: failureType}),
    )
  }
}
