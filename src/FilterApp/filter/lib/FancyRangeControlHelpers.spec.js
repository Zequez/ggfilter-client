import { mapRange } from './FancyRangeControlHelpers'

describe('FancyRangeFilterHelpers', () => {
  describe('mapRange', () => {
    it('should map individual values to the provided mapped range', () => {
      expect(mapRange(2, 2, [1, 2, 3, 4, 5, 6, 7], {'3': [1, 6]}))
      .to.deep.equal([0, 5])
    })

    it('should map ranged values to the provided range', () => {
      expect(mapRange(2, 5, [1, 2, 3, 4, 5, 6, 7], {'3-6': [2, 4]}))
      .to.deep.equal([1, 3])
    })

    it('should automatically hook individual values to the value provided', () => {
      expect(mapRange(2, 2, [1, 2, 3, 4, 5, 6, 7], {}, 7))
      .to.deep.equal([2, 6])
    })

    it('should give precedence to the map than to the autohook', () => {
      expect(mapRange(2, 2, [1, 2, 3, 4, 5, 6, 7], {'3': [1, 6]}, 7))
      .to.deep.equal([0, 5])
    })
  })
})
