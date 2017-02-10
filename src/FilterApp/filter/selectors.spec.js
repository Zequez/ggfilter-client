import definitions from '../lib/definitions'

const {
  definedControlsList,
  sfilterIsDirty
} = require('./selectors')

describe('FilterApp/filter', () => {
  describe('definedControlsList', () => {
    it('should return all defined controls sorted by the defined categories', () => {
      expect(definedControlsList({
        filter: {
          filter: {
            controlsList: ['ratings_pct', 'name']
          }
        }
      })).toEqual([definitions.filters.name, definitions.filters.ratings_pct])
    })
  })

  describe('sfilterIsDirty', () => {
    it('should return if the loaded sfilter is dirty (based on the filter)', () => {
      let filter = {
        name: 'Potato',
        controlsList: ['super', 'control']
      }

      expect(sfilterIsDirty({
        filter: {
          sfilter: filter,
          filter: filter
        }
      })).toEqual(false)

      expect(sfilterIsDirty({
        filter: {
          sfilter: filter,
          filter: {
            name: 'Potato',
            controlsList: ['super', 'control']
          }
        }
      })).toEqual(true)
    })
  })
})
