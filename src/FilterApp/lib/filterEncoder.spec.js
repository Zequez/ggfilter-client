import { minimize, maximize } from './filterEncoder'
import sinon from 'sinon'

sinon.config = { useFakeTimers: false } // sino fails without this for some reason

describe('b54FilterGenerator', () => {
  const definitions = {
    filters: {
      potato: { id: 1 },
      salad: { id: 2 },
      foo: { id: 3 },
      bar: { id: 6 },
      man: { id: 7 },
      wow: { id: 8 }
    },
    byId: {
      1: 'potato',
      2: 'salad',
      3: 'foo',
      6: 'bar',
      7: 'man',
      8: 'wow'
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
      }, definitions)).toEqual({
        '!': { v: 123 },
        '#': { g: 111, l: 222 },
        '&': { t: [1, 2, 3] }
      })
    })

    it('should convert true/false values to 1/0', () => {
      expect(minimize({
        params: {
          man: true,
          wow: false
        }
      }, definitions)).toEqual({
        '\'': 1,
        '(': 0
      })
    })

    it('should put the sort data under the space " " key', () => {
      expect(minimize({
        sort: {
          column: 'salad',
          asc: true
        }
      }, definitions)).toEqual({
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
      }, definitions)).toEqual({
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

    it('should convert 1/0 values to true/false', () => {
      expect(maximize({
        '\'': 1,
        '(': 0
      }, definitions)).toEqual({
        params: {
          man: true,
          wow: false
        },
        sort: {}
      })
    })
  })
})
