import { u } from 'lib/utils'
const api = require('sources/api')

export const initialState = {
  currentUser: null
}

// export const AUTH_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
// export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
// export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

export const AUTH_CURRENT_USER_REQUEST = 'AUTH_CURRENT_USER_REQUEST'
export const AUTH_CURRENT_USER_SUCCESS = 'AUTH_CURRENT_USER_SUCCESS'
export const AUTH_CURRENT_USER_FAILURE = 'AUTH_CURRENT_USER_FAILURE'

// login: (username, password) => ({
//   types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
//   callAPI: () => login(username, password)
// }),

export const getCurrentUser = () => ({
  types: [AUTH_CURRENT_USER_REQUEST, AUTH_CURRENT_USER_SUCCESS, AUTH_CURRENT_USER_FAILURE],
  callAPI: () => api.getCurrentUser(),
  autoCamelize: true
})

export function reducer (state = initialState, action) {
  switch (action.type) {
    case AUTH_CURRENT_USER_SUCCESS:
      if (action.response.id) {
        state = u(state, {currentUser: {$set: action.response}})
      } else {
        state = u(state, {currentUser: {$set: null}})
      }

      break
  }

  return state
}
