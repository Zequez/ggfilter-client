jest.mock('../config/defaultFilter', () => ({
  params: {
    hey: { moo: 'yes' }
  },
  sort: {
    column: 'name',
    asc: true
  }
}))

jest.mock('../config/masks', () => ({
  myMask: {
    params: {
      name: {value: 'NOPE'}
    },
    sort: {
      column: 'steam_id'
    }
  }
}))

const {
  visibleFiltersSelector,
  maskedFilterSelector,
  finalFilterSelector
} = require('./selectors')

describe('FilterApp/filter', () => {
  describe('visibleFiltersSelector', () => {
    it('should return all the filter names which param is not false', () => {
      expect(visibleFiltersSelector({
        filter: {
          params: {
            foo: 'aaa',
            bar: false,
            potato: { salad: 'yes' }
          }
        }
      })).toEqual(['hey', 'foo', 'potato'])
    })
  })

  describe('maskedFilterSelector', () => {
    it('should return the base filter + masks', () => {
      expect(maskedFilterSelector({
        filter: {
          params: {
            moo: 'meow'
          },
          sort: {},
          masks: ['myMask']
        }
      })).toEqual({
        params: {
          hey: { moo: 'yes' },
          name: {value: 'NOPE'}
        },
        sort: {
          column: 'steam_id',
          asc: true
        }
      })
    })
  })

  describe('finalFilterSelector', () => {
    it('should return the base filter + masks + extra', () => {
      expect(finalFilterSelector({
        filter: {
          params: {
            moo: 'meow'
          },
          sort: {},
          masks: ['myMask']
        }
      })).toEqual({
        params: {
          hey: { moo: 'yes' },
          name: {value: 'NOPE'},
          moo: 'meow'
        },
        sort: {
          column: 'steam_id',
          asc: true
        },
        masks: ['myMask']
      })
    })
  })
})
