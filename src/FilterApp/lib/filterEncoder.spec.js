import { minimize, maximize } from './filterEncoder'
import sinon from 'sinon'

sinon.config = { useFakeTimers: false } // sino fails without this for some reason

describe.only('b54FilterGenerator', () => {
  const definitions = {
    filters: {
      potato: { id: 1 },
      salad: { id: 2 },
      foo: { id: 3 },
      bar: { id: 6 }
    },
    byId: {
      1: 'potato',
      2: 'salad',
      3: 'foo',
      6: 'bar'
    }
  }

  describe('minimize', () => {
    it('should convert the params to single-letter based in the filters definitions IDs', () => {
      expect(minimize({
        params: {
          potato: { value: 123 },
          foo: { gt: 111, lt: 222 },
          bar: { tags: [1, 2, 3] }
        }
      }, definitions)).to.deep.equal({
        '!': { v: 123 },
        '#': { g: 111, l: 222 },
        '&': { t: [1, 2, 3] }
      })
    })

    it('should put the sort data under the space " " key', () => {
      expect(minimize({
        sort: {
          column: 'salad',
          asc: true
        }
      }, definitions)).to.deep.equal({
        ' ': { c: '"', a: 1 }
      })
    })
  })

  describe('maximize', () => {
    it('should convert the minimized params back to the original', () => {
      expect(maximize({
        '!': { v: 123 },
        '#': { g: 111, l: 222 },
        '&': { t: [1, 2, 3] },
        ' ': { c: '"', a: 1 }
      }, definitions)).to.deep.equal({
        params: {
          potato: { value: 123 },
          foo: { gt: 111, lt: 222 },
          bar: { tags: [1, 2, 3] }
        },
        sort: {
          column: 'salad',
          asc: true
        }
      })
    })
  })
})
