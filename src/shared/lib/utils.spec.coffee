utils = require './utils'

describe 'utils', ->
  describe '.snapTo', ->
    it 'should round to a higher number', ->
      expect(utils.snapTo(9, 5)).to.equal(10)

    it 'should round to a lower number', ->
      expect(utils.snapTo(17, 5)).to.equal(15)

  describe '.timeInWords', ->
    it 'should work with second', ->
      expect(utils.timeInWords(1)).to.equal('1 second')
    it 'should work with seconds', ->
      expect(utils.timeInWords(44)).to.equal('44 seconds')
    it 'should work with minute', ->
      expect(utils.timeInWords(60)).to.equal('1 minute')
    it 'should work with minutes', ->
      expect(utils.timeInWords(60 * 10)).to.equal('10 minutes')
    it 'should work with week', ->
      expect(utils.timeInWords(60 * 60 * 24 * 7)).to.equal('1 week')
    it 'should work with weeks', ->
      expect(utils.timeInWords(60 * 60 * 24 * 7 * 3)).to.equal('3 weeks')
    it 'should work with month', ->
      expect(utils.timeInWords(60 * 60 * 24 * 30)).to.equal('1 month')
    it 'should work with months', ->
      expect(utils.timeInWords(60 * 60 * 24 * 30 * 3)).to.equal('3 months')
    it 'should work with year', ->
      expect(utils.timeInWords(60 * 60 * 24 * 365)).to.equal('1 year')
    it 'should work with years', ->
      expect(utils.timeInWords(60 * 60 * 24 * 365 * 10)).to.equal('10 years')

  describe '.objectMatchesExtension', ->
    fun = utils.objectMatchesExtension

    describe 'with one key to match', ->
      it 'should return true for equal objects', ->
        expect(fun({potato: 1}, {potato: 1})).to.equal(true)
      it 'should return true for matched keys', ->
        expect(fun({potato: 1, other: 2}, {potato: 1})).to.equal(true)
      it 'should return false for different key values', ->
        expect(fun({potato: 1}, {potato: 2})).to.equal(false)
      it 'should return false for different keys', ->
        expect(fun({other: 1}, {potato: 1})).to.equal(false)

    describe 'with multiple keys to match', ->
      it 'should return true for matched keys', ->
        expect(fun({potato: 1, salad: 2, other: 2}, {potato: 1, salad: 2})).to.equal(true)
      it 'should return false if one of the key values do not match', ->
        expect(fun({potato: 1, salad: 0, other: 2}, {potato: 1, salad: 2})).to.equal(false)
      it 'should return false if one of the key is not there', ->
        expect(fun({potato: 1, other: 2}, {potato: 1, salad: 2})).to.equal(false)

    describe 'with objects with values', ->
      it 'should return true for matched values', ->
        expect(fun({potato: {hey: 123}, other: 2}, {potato: {hey: 123}})).to.equal(true)
      it 'should return false for non matched values', ->
        expect(fun({potato: {hey: 666}, other: 2}, {potato: {hey: 123}})).to.equal(false)
      it 'should NOT match this real life object', ->
        store = {"visible":["steam_id","name","released_at","tags","lowest_steam_price","steam_discount","playtime_median","playtime_median_ftb","steam_reviews_count","steam_reviews_ratio","platforms","players","vr"],"params":{"steam_reviews_count":{"gt":65},"steam_reviews_ratio":{"gt":95},"playtime_median_ftb":{"gt":1.5}},"sort":"lowest_steam_price","sortAsc":true}
        shortcut = {"params":{"playtime_median_ftb":{"gt":1.5}},"sort":"playtime_median_ftb","sortAsc":false}
        expect(fun(store, shortcut)).to.equal(false)
