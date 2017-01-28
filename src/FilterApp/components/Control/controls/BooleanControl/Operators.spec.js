import React from 'react'
import renderer from 'react-test-renderer'
import Operators from './Operators'

describe('Operators', () => {
  it('returns change whenever you click it', () => {
    let receiveChange = jest.fn()
    const component = renderer.create(<Operators
      modes={['and', 'or', 'xor']}
      value='or'
      onChange={receiveChange}
    />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    expect(tree.props.className).toMatch(/Operators_or/i)

    tree.props.onClick()
    expect(receiveChange).toHaveBeenCalledWith('xor')
  })
})
