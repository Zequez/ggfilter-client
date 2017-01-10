const utils = require('./misc')

describe('utils/misc', () => {
  describe('.snapTo', () => {
    it('should round to a higher number', () =>
      expect(utils.snapTo(9, 5)).toBe(10))

    it('should round to a lower number', () =>
      expect(utils.snapTo(17, 5)).toBe(15))
  })
})
