import sinon from 'sinon'
import { visibleFiltersSelector } from './selectors'

describe('FilterApp/filter', () => {
  describe('visibleFiltersSelector', () => {
    it('should return all the filter names which param is not false', () => {
      sinon.test(() => {
        this.stub(require('../config/defaultFilter'), 'default', {
          params: {},
          sort: {}
        })

        expect(visibleFiltersSelector({
          filter: {
            params: {
              foo: 'aaa',
              bar: false,
              potato: { salad: 'yes' }
            }
          }
        })).toEqual(['foo', 'potato'])
      })
    })
  })
})
