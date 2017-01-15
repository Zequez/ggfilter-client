const {
  SET_BASE,
  SET_DELTA,
  MUTATE,
  setParam
} = require('./reducer')

let reducer = require('./reducer').reducer
// function withDefaultFilter (defaultFilter) {
//   jest.mock('./defaultFilter', () => defaultFilter)
//   jest.mock('./frontPageFilter', () => defaultFilter)
//   jest.resetModules()
//   reducer = require('./newReducer').reducer
// }

describe('FilterApp/filter reducer', () => {
  describe('reducer', () => {
    describe(MUTATE, () => {
      it('changes the delta with an empty base', () => {
        let state = {
          base: {
            params: {},
            sort: {}
          },
          delta: {
            params: {
              foo: {bar: true},
              galaxy: {bar: 'rsa'}
            },
            sort: {
              column: 'steam_id',
              asc: true
            }
          }
        }

        expect(reducer(state, {
          type: MUTATE,
          mask: {
            params: {
              foo: {pen: 'cuck'},
              potato: {value: true}
            },
            sort: {
              column: 'name'
            }
          }
        }))
        .toEqual({
          base: {
            params: {},
            sort: {}
          },
          delta: {
            params: {
              foo: {pen: 'cuck'},
              galaxy: {bar: 'rsa'},
              potato: {value: true}
            },
            sort: {
              column: 'name',
              asc: true
            }
          }
        })
      })

      it('should remove things that are already present in the base filter', () => {
        let state = {
          base: {
            params: {
              foo: { pen: 'cuck' },
              potato: { value: true }
            },
            sort: {
              column: 'name',
              asc: false
            }
          },
          delta: {
            params: {
              foo: {bar: true},
              galaxy: {bar: 'rsa'}
            },
            sort: {
              column: 'steam_id',
              asc: true
            }
          }
        }

        expect(reducer(state, {
          type: MUTATE,
          mask: {
            params: {
              foo: {pen: 'cuck'},
              potato: {value: true}
            },
            sort: {
              column: 'name'
            }
          }
        }))
        .toEqual({
          base: {
            params: {
              foo: { pen: 'cuck' },
              potato: { value: true }
            },
            sort: {
              column: 'name',
              asc: false
            }
          },
          delta: {
            params: {
              galaxy: {bar: 'rsa'}
            },
            sort: {
              asc: true
            }
          }
        })
      })
    })
  })

  describe('action creators', () => {
    let nd = (action) => {
      delete action.dispatch
      return action
    }

    describe('.setParam', () => {
      it('should return a mutation action to show the param', () =>
        expect(nd(setParam('potato', true))).toEqual({
          type: MUTATE,
          mask: { params: { potato: true } }
        })

      )
      it('should return a mutation to hide the param', () =>
        expect(nd(setParam('potato', false))).toEqual({
          type: MUTATE,
          mask: { params: { potato: false } }
        })

      )
      it('should return a mutation to set the param to any value', () =>
        expect(nd(setParam('potato', {value: 'whoa'}))).toEqual({
          type: MUTATE,
          mask: { params: { potato: {value: 'whoa'} } }
        })
      )
    })
  })
})
