import React from 'react'
import renderer from 'react-test-renderer'
import { Simulate } from 'react-addons-test-utils'
import $ from 'teaspoon'
import Flags from './Flags'

jest.mock('../../../../config/enumColumns', () => ({
  values: {
    platforms: {
      win: 0b1,
      mac: 0b10,
      linux: 0b100
    }
  },
  names: {
    platforms: {
      win: 'Windows',
      mac: 'Mac',
      linux: 'Linux'
    }
  }
}))

describe('Flags', () => {
  it('should match snapshot', () => {
    let tree = renderer.create(<Flags
      value={0b101}
      enumType='platforms'
      onChange={() => {}}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should change when clicked', () => {
    let receiveChange = jest.fn()
    let comp = $(
      <Flags
        value={0b101}
        enumType='platforms'
        onChange={receiveChange}/>
    ).render()

    Simulate.change(comp.find('input')[1], {target: {checked: true}})
    expect(receiveChange).toHaveBeenCalledWith(0b111)
  })
})
