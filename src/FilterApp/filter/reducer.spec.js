const {
  MUTATE,
  ADD_MASK,
  REMOVE_MASK,
  setParam,
  reducer
} = require('./reducer')

describe('FilterApp/filter reducer', () => {
  describe('reducer', () => {
    describe(MUTATE, () => {
      let initialState = {
        params: {
          foo: {bar: true},
          galaxy: {bar: 'rsa'}
        },
        sort: {
          column: 'steam_id',
          asc: true
        },
        masks: []
      }

      it('should update the state normally', () => {
        jest.mock('../config/defaultFilter', () => ({
          params: {},
          sort: {}
        }))
        jest.resetModules()
        let reducer = require('./reducer').reducer

        expect(reducer(initialState, {
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
          params: {
            foo: {pen: 'cuck'},
            galaxy: {bar: 'rsa'},
            potato: {value: true}
          },
          sort: {
            column: 'name',
            asc: true
          },
          masks: []
        })
      })

      it('should remove things that are already present in the default filter', () => {
        jest.mock('../config/defaultFilter', () => ({
          params: {
            foo: { pen: 'cuck' },
            potato: { value: true }
          },
          sort: {
            column: 'name',
            asc: false
          }
        }))

        jest.resetModules()
        let reducer = require('./reducer').reducer

        expect(reducer(initialState, {
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
          params: {
            galaxy: {bar: 'rsa'}
          },
          sort: {
            asc: true
          },
          masks: []
        })
      })
    })

    describe(ADD_MASK, () => {
      it('should add a mask to the state.masks', () => {
        let state = {params: {}, sort: {}, masks: ['hey']}
        expect(reducer(state, {type: ADD_MASK, mask: 'potato'}))
          .toEqual({params: {}, sort: {}, masks: ['hey', 'potato']})
      })
    })

    describe(REMOVE_MASK, () => {
      it('should remove a mask from the state.mask', () => {
        let state = {params: {}, sort: {}, masks: ['hey', 'potato', 'salad']}
        expect(reducer(state, {type: REMOVE_MASK, mask: 'potato'}))
          .toEqual({params: {}, sort: {}, masks: ['hey', 'salad']})
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

    // describe('.addTagFilter', function () {})
  })
})
