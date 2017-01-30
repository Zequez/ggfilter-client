import { getLowest } from './MultiPriceColumn'

describe('getLowest', () => {
  it('should return nothing with no prices', () => {
    expect(getLowest({})).toEqual([])
  })

  it('should not return anything for a single store', () => {
    expect(getLowest({
      steam: {
        current: 100
      }
    })).toEqual([])
  })

  it('should return the lowest price from multiple stores', () => {
    expect(getLowest({
      steam: {
        current: 100
      },
      oculus: {
        current: 80
      }
    })).toEqual(['oculus'])
  })

  it('should return multiple stores with the same price', () => {
    expect(getLowest({
      steam: {
        current: 100
      },
      oculus: {
        current: 60
      },
      gog: {
        current: 60
      }
    })).toEqual(['oculus', 'gog'])
  })

  it('should not return any store if the prices are all the same', () => {
    expect(getLowest({
      steam: {
        current: 60
      },
      oculus: {
        current: 60
      },
      gog: {
        current: 60
      }
    })).toEqual([])
  })
})
