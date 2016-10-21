import sinon from 'sinon'

jest.mock('./definitions', () => ({
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
}))

jest.mock('../config/masks', () => ({
  potato: {
    params: {},
    sort: {}
  },
  salad: {
    params: {},
    sort: {}
  }
}))

const { minimize, maximize, encode, decode, toB64, fromB64 } = require('./filterEncoder')

sinon.config = { useFakeTimers: false } // sino fails without this for some reason

describe('FilterApp filterEncoder', () => {
  describe('minimize', () => {
    it('should convert the params to single-letter based in the filters definitions IDs', () => {
      expect(minimize({
        params: {
          potato: { value: 123 },
          foo: { gt: 111, lt: 222 },
          bar: { tags: [1, 2, 3] }
        }
      })).toEqual({
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
      })).toEqual({
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
      })).toEqual({
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
      })).toEqual({
        params: {
          potato: { value: 123 },
          foo: { gt: 111, lt: 222 },
          bar: { tags: [1, 2, 3] }
        },
        sort: {
          column: 'salad',
          asc: true
        },
        masks: []
      })
    })

    it('should convert 1/0 values to true/false', () => {
      expect(maximize({
        '\'': 1,
        '(': 0
      })).toEqual({
        params: {
          man: true,
          wow: false
        },
        sort: {},
        masks: []
      })
    })
  })

  describe('encode/decode', () => {
    let filter = {params: {}, sort: {asc: true}, masks: ['potato', 'salad']}
    let encodedThing = 'eyIgIjp7ImEiOjF9fQ'
    let result = `potato+salad+${encodedThing}`

    it('should encode', () => {
      expect(encode(filter)).toBe(result)
    })

    it('should decode', () => {
      expect(decode(result)).toEqual(filter)
    })

    it('should warn and ignore non registered masks', () => {
      console.warn = jest.fn()
      expect(decode(`NOPE+${encodedThing}`)).toEqual({params: {}, sort: {asc: true}, masks: []})
      expect(console.warn).toHaveBeenCalled()
    })

    it('should allow to decode masks without extra filters', () => {
      expect(decode(`potato+salad`)).toEqual({
        params: {},
        sort: {},
        masks: ['potato', 'salad']
      })
    })

    it('should give a warning and return an empty filter when decoding an erroneous filter', () => {
      console.warn = jest.fn()
      expect(decode('potato+neonreaistneisra')).toEqual({
        params: {},
        sort: {},
        masks: ['potato']
      })
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('toB64/fromB64', () => {
    let subject = {name: 'äöüÄÖÜçéèñ'}
    it('should work work with strange UTF characters', () => {
      let result = toB64(subject)
      expect(result).not.toEqual(subject)
      expect(fromB64(result)).toEqual(subject)
    })

    it('should replace + signs with underscores', () => {
      expect(toB64(subject)).toEqual('eyJuYW1lIjoi5Pb8xNbc5_no8SJ9')
      expect(fromB64('eyJuYW1lIjoi5Pb8xNbc5_no8SJ9')).toEqual(subject)
    })
  })
})
