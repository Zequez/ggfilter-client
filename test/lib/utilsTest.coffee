utils = require 'lib/utils'

describe 'utils', ->
  describe '.snapTo', ->
    it 'should round to a higher number', ->
      expect(utils.snapTo(9, 5)).to.equal(10)

    it 'should round to a lower number', ->
      expect(utils.snapTo(17, 5)).to.equal(15)
