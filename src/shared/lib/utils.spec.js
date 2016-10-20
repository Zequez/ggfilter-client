const utils = require('./utils')

describe('utils', () => {
  describe('.snapTo', () => {
    it('should round to a higher number', () =>
      expect(utils.snapTo(9, 5)).toBe(10))

    it('should round to a lower number', () =>
      expect(utils.snapTo(17, 5)).toBe(15))
  })

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

  describe('.objectMatchesExtension', () => {
    let fun = utils.objectMatchesExtension

    describe('with one key to match', () => {
      it('should return true for equal objects', () =>
        expect(fun({potato: 1}, {potato: 1})).toBe(true))
      it('should return true for matched keys', () =>
        expect(fun({potato: 1, other: 2}, {potato: 1})).toBe(true))
      it('should return false for different key values', () =>
        expect(fun({potato: 1}, {potato: 2})).toBe(false))
      it('should return false for different keys', () =>
        expect(fun({other: 1}, {potato: 1})).toBe(false))
    })

    describe('with multiple keys to match', () => {
      it('should return true for matched keys', () =>
        expect(fun({potato: 1, salad: 2, other: 2}, {potato: 1, salad: 2})).toBe(true))
      it('should return false if one of the key values do not match', () =>
        expect(fun({potato: 1, salad: 0, other: 2}, {potato: 1, salad: 2})).toBe(false))
      it('should return false if one of the key is not there', () =>
        expect(fun({potato: 1, other: 2}, {potato: 1, salad: 2})).toBe(false))
    })

    describe('with objects with values', () => {
      it('should return true for matched values', () =>
        expect(fun({potato: {hey: 123}, other: 2}, {potato: {hey: 123}})).toBe(true))
      it('should return false for non matched values', () =>
        expect(fun({potato: {hey: 666}, other: 2}, {potato: {hey: 123}})).toBe(false))
      it('should NOT match this real life object', () => {
        let store = {'visible': ['steam_id', 'name', 'released_at', 'tags', 'lowest_steam_price', 'steam_discount', 'playtime_median', 'playtime_median_ftb', 'steam_reviews_count', 'steam_reviews_ratio', 'platforms', 'players', 'vr'], 'params': {'steam_reviews_count': {'gt': 65}, 'steam_reviews_ratio': {'gt': 95}, 'playtime_median_ftb': {'gt': 1.5}}, 'sort': 'lowest_steam_price', 'sortAsc': true}
        let shortcut = {'params': {'playtime_median_ftb': {'gt': 1.5}}, 'sort': 'playtime_median_ftb', 'sortAsc': false}
        return expect(fun(store, shortcut)).toBe(false)
      })
    })
  })
})
