const utils = require('./date')

describe('utils', () => {
  describe('.timeInWords', () => {
    it('should work with second', () =>
      expect(utils.timeInWords(1)).toBe('1 second'))
    it('should work with seconds', () =>
      expect(utils.timeInWords(44)).toBe('44 seconds'))
    it('should work with minute', () =>
      expect(utils.timeInWords(60)).toBe('1 minute'))
    it('should work with minutes', () =>
      expect(utils.timeInWords(60 * 10)).toBe('10 minutes'))
    it('should work with week', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 7)).toBe('1 week'))
    it('should work with weeks', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 7 * 3)).toBe('3 weeks'))
    it('should work with month', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 30)).toBe('1 month'))
    it('should work with months', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 30 * 3)).toBe('3 months'))
    it('should work with year', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 365)).toBe('1 year'))
    it('should work with years', () =>
      expect(utils.timeInWords(60 * 60 * 24 * 365 * 10)).toBe('10 years'))
  })

  let d = (v) => v == null ? new Date() : new Date(v)

  describe('.relativeTimeInWords', () => {
    it('should work in the past', () =>
      expect(utils.relativeTimeInWords(d(d().valueOf() - 1000 * 60 * 60 * 3))).toBe('3 hours ago'))
    it('should work in the future', () =>
      expect(utils.relativeTimeInWords(d(d().valueOf() + 1000 * 60 * 60 * 3))).toBe('3 hours in the future'))
  })
})
