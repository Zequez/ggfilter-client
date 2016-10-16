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
