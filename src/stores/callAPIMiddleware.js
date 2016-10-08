import { camelizeKeys } from 'lib/utils'

export default function callAPIMiddleware ({ dispatch, getState }) {
  return next => action => {
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
        if (after) after(response)
        return dispatch({...payload, response, type: successType})
      },
      error => dispatch({...payload, error, type: failureType}),
    )
  }
}
