import { visibleFiltersSelector } from './selectors'

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
      })).to.deep.equal(['foo', 'potato'])
    })
  })
})
