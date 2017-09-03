import React from 'react'
import renderer from 'react-test-renderer'
import Percentiles, { getCurrentColumn } from './Percentiles'

describe('RatingsPctColumn Percentiles', () => {
  describe('getCurrentColumn', () => {
    it('should return the highlighted column index', () => {
      expect(getCurrentColumn(10, 5)).toEqual(0)
      expect(getCurrentColumn(10, 15)).toEqual(1)
      expect(getCurrentColumn(10, 99)).toEqual(9)
    })
  })

  it('should match snapshot', () => {
    const component = renderer.create(<Percentiles
      divisions={10}
      pct={99}
    />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
