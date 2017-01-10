import React from 'react'
import DateRangeChip from './DateRangeChip'
import { mount } from 'enzyme'

let dd = (str) => Date.parse(str) / 1000
let comp = (gt, lt) => {
  return mount(<DateRangeChip query={{gt: gt && dd(gt), lt: lt && dd(lt)}}/>)
}

describe('DateRangeChip', () => {
  describe('only gt', () => {
    it('shows specific dates', () => {
      expect(comp('2016-5-10').text()).toBe('After 10 May 2016')
    })

    it('shows only the year if the first of january', () => {
      expect(comp('2016-1-1').text()).toBe('≥ 2016')
    })
  })

  describe('only lt', () => {
    it('shows specific dates', () => {
      expect(comp(null, '2016-5-10').text()).toBe('Before 10 May 2016')
    })

    it('shows only the year if the first of january', () => {
      expect(comp(null, '2016-1-1').text()).toBe('≤ 2015')
    })
  })

  describe('range', () => {
    it('shows specific dates', () => {
      expect(comp('2015-3-10', '2016-5-10').text()).toBe('Between 10 Mar 2015 and 10 May 2016')
    })

    it('shows only the year if the first of january', () => {
      expect(comp('2015-1-1', '2017-1-1').text()).toBe('2015-2016')
    })

    it('shows a single year', () => {
      expect(comp('2015-1-1', '2016-1-1').text()).toBe('2015')
    })
  })
})
