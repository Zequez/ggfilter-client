import * as a from './actions'
import reducer from './reducer'

const A = (type, payload) => ({type, payload})

describe('filter reducer', () => {
  // Filter modification

  describe('SET_CONTROL', () => {
    let genState = (items) => ({
      filter: { controlsList: items }
    })

    it('should add a control to the list', () => {
      let action = A(a.SET_CONTROL, ['potato', true])
      let store = genState(['other'])
      expect(reducer(store, action)).toEqual(genState(['other', 'potato']))
    })

    it('should not add a control if it already is there', () => {
      let action = A(a.SET_CONTROL, ['potato', true])
      let store = genState(['potato', 'other'])
      expect(reducer(store, action)).toEqual(genState(['potato', 'other']))
    })

    it('should remove a control from the list', () => {
      let action = A(a.SET_CONTROL, ['potato', false])
      let store = genState(['potato', 'other'])
      expect(reducer(store, action)).toEqual(genState(['other']))
    })

    it('should not have any problem with removing something that isnt there', () => {
      let action = A(a.SET_CONTROL, ['potato', false])
      let store = genState(['other'])
      expect(reducer(store, action)).toEqual(genState(['other']))
    })
  })

  describe('SET_CONTROL_PARAMS', () => {
    let store = {
      filter: {
        controlsParams: {
          other: {value: 'Woo'}
        }
      }
    }

    it('should set the params to the control', () => {
      let action = A(a.SET_CONTROL_PARAMS, ['potato', {value: 'Yippie!'}])
      expect(reducer(store, action)).toEqual({
        filter: {
          controlsParams: {
            other: {value: 'Woo'},
            potato: {value: 'Yippie!'}
          }
        }
      })
    })

    it('should allow to remove params', () => {
      let action = A(a.SET_CONTROL_PARAMS, ['other', null])
      expect(reducer(store, action)).toEqual({
        filter: {
          controlsParams: {}
        }
      })
    })
  })

  // Saving filter stuff

  describe('CREATE_SFILTER_', () => {
    describe('CREATE_SFILTER_REQUEST', () => {
      it('should set loading to true', () => {
        expect(reducer({}, A(a.CREATE_SFILTER_REQUEST))).toEqual({
          sfilterLoading: true
        })
      })
    })

    describe('CREATE_SFILTER_FAILURE', () => {
      it('should loading to false and error to the error', () => {
        let error = new Error('Woo')
        let action = A(a.CREATE_SFILTER_FAILURE, error)
        expect(reducer({}, action)).toEqual({
          sfilterLoading: false,
          sfilterError: error
        })
      })
    })

    describe('CREATE_SFILTER_SUCCESS', () => {
      beforeEach(() => global.localStorage.clear())

      it('should set it to the sfilter and filter', () => {
        let filter = {
          sid: '123_abc',
          name: 'Super filter',
          secret: 'I pee sitting down'
        }
        let action = A(a.CREATE_SFILTER_SUCCESS, filter)
        let state = {
          sfilter: null,
          sfilterError: {},
          sfilterLoading: true,
          filter: { name: 'Woah' }
        }

        expect(reducer(state, action)).toEqual({
          sfilter: filter,
          sfilterError: null,
          sfilterLoading: false,
          filter: filter
        })
      })

      it('should add the secret to localstorage', () => {
        let filter = {
          sid: 'abc',
          secret: 'Woops'
        }
        let action = A(a.CREATE_SFILTER_SUCCESS, filter)
        reducer({}, action)
        expect(JSON.parse(localStorage.getItem('secrets'))).toEqual({
          abc: 'Woops'
        })
      })
    })
  })

  describe('UPDATE_SFILTER_', () => {
    describe('UPDATE_SFILTER_REQUEST', () => {
      it('should set loading to true', () => {
        expect(reducer({}, A(a.UPDATE_SFILTER_REQUEST))).toEqual({
          sfilterLoading: true
        })
      })
    })

    describe('UPDATE_SFILTER_FAILURE', () => {
      it('should loading to false and error to the error', () => {
        let error = new Error('Woo')
        let action = A(a.UPDATE_SFILTER_FAILURE, error)
        expect(reducer({}, action)).toEqual({
          sfilterLoading: false,
          sfilterError: error
        })
      })
    })

    describe('UPDATE_SFILTER_SUCCESS', () => {
      it('should set it to the sfilter and filter', () => {
        let filter = {
          sid: '123_abc',
          name: 'Super filter'
        }
        let action = A(a.UPDATE_SFILTER_SUCCESS, filter)
        let state = {
          sfilter: { name: 'Woah' },
          sfilterError: {},
          sfilterLoading: true,
          filter: { name: 'Super filter' }
        }

        expect(reducer(state, action)).toEqual({
          sfilter: filter,
          sfilterError: null,
          sfilterLoading: false,
          filter: filter
        })
      })
    })
  })
})

// const {
//   SET_BASE,
//   SET_DELTA,
//   MUTATE,
//   setParam
// } = require('./reducer')
//
// let reducer = require('./reducer').reducer
// function withDefaultFilter (defaultFilter) {
//   jest.mock('./defaultFilter', () => defaultFilter)
//   jest.mock('./frontPageFilter', () => defaultFilter)
//   jest.resetModules()
//   reducer = require('./newReducer').reducer
// }

// describe('FilterApp/filter reducer', () => {
//   describe('reducer', () => {
//     describe(MUTATE, () => {
//       it('changes the delta with an empty base', () => {
//         let state = {
//           base: {
//             params: {},
//             sort: {}
//           },
//           delta: {
//             params: {
//               foo: {bar: true},
//               galaxy: {bar: 'rsa'}
//             },
//             sort: {
//               column: 'steam_id',
//               asc: true
//             }
//           }
//         }
//
//         expect(reducer(state, {
//           type: MUTATE,
//           mask: {
//             params: {
//               foo: {pen: 'cuck'},
//               potato: {value: true}
//             },
//             sort: {
//               column: 'name'
//             }
//           }
//         }))
//         .toEqual({
//           base: {
//             params: {},
//             sort: {}
//           },
//           delta: {
//             params: {
//               foo: {pen: 'cuck'},
//               galaxy: {bar: 'rsa'},
//               potato: {value: true}
//             },
//             sort: {
//               column: 'name',
//               asc: true
//             }
//           }
//         })
//       })
//
//       it('should remove things that are already present in the base filter', () => {
//         let state = {
//           base: {
//             params: {
//               foo: { pen: 'cuck' },
//               potato: { value: true }
//             },
//             sort: {
//               column: 'name',
//               asc: false
//             }
//           },
//           delta: {
//             params: {
//               foo: {bar: true},
//               galaxy: {bar: 'rsa'}
//             },
//             sort: {
//               column: 'steam_id',
//               asc: true
//             }
//           }
//         }
//
//         expect(reducer(state, {
//           type: MUTATE,
//           mask: {
//             params: {
//               foo: {pen: 'cuck'},
//               potato: {value: true}
//             },
//             sort: {
//               column: 'name'
//             }
//           }
//         }))
//         .toEqual({
//           base: {
//             params: {
//               foo: { pen: 'cuck' },
//               potato: { value: true }
//             },
//             sort: {
//               column: 'name',
//               asc: false
//             }
//           },
//           delta: {
//             params: {
//               galaxy: {bar: 'rsa'}
//             },
//             sort: {
//               asc: true
//             }
//           }
//         })
//       })
//     })
//   })
//
//   describe('action creators', () => {
//     let nd = (action) => {
//       delete action.dispatch
//       return action
//     }
//
//     describe('.setParam', () => {
//       it('should return a mutation action to show the param', () =>
//         expect(nd(setParam('potato', true))).toEqual({
//           type: MUTATE,
//           mask: { params: { potato: true } }
//         })
//
//       )
//       it('should return a mutation to hide the param', () =>
//         expect(nd(setParam('potato', false))).toEqual({
//           type: MUTATE,
//           mask: { params: { potato: false } }
//         })
//
//       )
//       it('should return a mutation to set the param to any value', () =>
//         expect(nd(setParam('potato', {value: 'whoa'}))).toEqual({
//           type: MUTATE,
//           mask: { params: { potato: {value: 'whoa'} } }
//         })
//       )
//     })
//   })
// })
