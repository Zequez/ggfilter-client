import sinon from 'sinon'
import rangeInterpolation from './rangeInterpolation'

describe('rangeInterpolation', () => {
  let range = [null, 1, 3, 5, 10, 20, 30, 40, 60, null]

  function render (start, end, range, options = {}) {
    return rangeInterpolation({gt: range[start], lt: range[end]}, options)
  }

  describe('individual label', () => {
    it('should render with basic config', () => {
      const f = render(2, 2, range)
      expect(f).toBe('3')
    })

    it('should render with interpolation', () => {
      const f = render(2, 2, range, {
        '': '${v}'
      })
      expect(f).toBe('$3')
    })

    it('should render from the named labels data', () => {
      const f = render(2, 2, range, {
        '3': 'Potato!'
      })
      expect(f).toBe('Potato!')
    })

    it('should allow function interpolation', () => {
      let interpolation = sinon.stub()
      interpolation.onFirstCall().returns('Yay!')
      const f = render(2, 2, range, {
        '': interpolation
      })
      expect(interpolation.getCall(0).args[0]).toBe(3)
      expect(f).toBe('Yay!')
    })
  })

  describe('range label', () => {
    it('should render with basic config', () => {
      const f = render(2, 7, range)
      expect(f).toBe('3 to 40')
    })

    it('should render with interpolation', () => {
      const f = render(2, 7, range, {
        '*-*': '{s} potato {e}',
        '': '${v}'
      })
      expect(f).toBe('3 potato 40')
    })

    it('should render with individual and range interpolation both', () => {
      const f = render(2, 7, range, {
        '*-*': '{si} tooo {ei}',
        '': '${v}'
      })
      expect(f).toBe('$3 tooo $40')
    })

    it('should render with the individual labels named labels data', () => {
      const f = render(2, 7, range, {
        '3': 'FREE!',
        '40': 'Non-free'
      })
      expect(f).toBe('FREE! to Non-free')
    })

    it('should render from named labels data', () => {
      const f = render(2, 7, range, {
        '3-40': 'Potato!'
      })
      expect(f).toBe('Potato!')
    })

    it('should allow function interpolation', () => {
      let rangeInterpolation = sinon.stub()
      rangeInterpolation.onFirstCall().returns('Yay!')
      const f = render(2, 7, range, {
        '': '!{v}!',
        '*-*': rangeInterpolation
      })
      expect(rangeInterpolation.getCall(0).args[0]).toBe(3)
      expect(rangeInterpolation.getCall(0).args[1]).toBe(40)
      expect(rangeInterpolation.getCall(0).args[2]).toBe('!3!')
      expect(rangeInterpolation.getCall(0).args[3]).toBe('!40!')
      expect(f).toBe('Yay!')
    })
  })

  describe('range ends in Infinity', () => {
    it('should render with the gt interpolation', () => {
      const f = render(2, 9, range)
      expect(f).toBe('≥3')
    })

    it('should render with individual and gt interpolation both', () => {
      const f = render(2, 9, range, {
        '*->': 'more than {si}',
        '': '!{v}!'
      })
      expect(f).toBe('more than !3!')
    })

    it('should render from a named label data', () => {
      const f = render(2, 9, range, {
        '3-null': 'Ohhhh'
      })
      expect(f).toBe('Ohhhh')
    })
  })

  describe('range starts in null', () => {
    it('should render with the lt interpolation', () => {
      const f = render(0, 2, range)
      expect(f).toBe('≤3')
    })

    it('should render with individual and lt interpolation both', () => {
      const f = render(0, 2, range, {
        '<-*': 'less than {ei}',
        '': '!{v}!'
      })
      expect(f).toBe('less than !3!')
    })

    it('should render from a named label data', () => {
      const f = render(0, 2, range, {
        'null-3': 'Yeah!'
      })
      expect(f).toBe('Yeah!')
    })
  })
})
