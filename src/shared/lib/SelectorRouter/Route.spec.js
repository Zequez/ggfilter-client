import Route from './Route'

describe('SelectorRouter/Route', () => {
  describe('matchState', () => {
    let state = {
      mode: 'potato',
      sfilter: {
        sid: '12345'
      }
    }
    let modeSelector = (s) => s.mode
    let dirtySelector = (s) => true
    let sfilterSelector = (s) => s.sfilter

    it('should match the state based on selectors and return the path', () => {
      let sr = new Route('name', {
        path: '/f/:sid',
        query: {
          galaxy: ':mode'
        },
        selectors: (s) => ({
          sid: sfilterSelector(s).sid,
          mode: modeSelector(s)
        })
      })

      expect(sr.matchState(state)).toBe('/f/12345?galaxy=potato')
    })

    it('should not match the state if the condition is not met', () => {
      let sr = new Route('name', {
        path: '/f/:sid',
        selectors: (s) => ({
          sid: sfilterSelector(s).sid
        }),
        conditions: (s) => (dirtySelector(s) === false)
      })

      expect(sr.matchState(state)).toBe(null)
    })

    it('should skip the conditions with the force option', () => {
      let sr = new Route('name', {
        path: '/f/:sid',
        selectors: (s) => ({
          sid: sfilterSelector(s).sid
        }),
        conditions: (s) => (dirtySelector(s) === false)
      })

      expect(sr.matchState(state, true)).toBe('/f/12345')
    })
  })

  describe('matchPath', () => {
    it('should return a function that takes the dispatcher if it matches', () => {
      let location = {
        pathname: '/f/123456',
        query: {potato: '321', hey: 'Arnold'}
      }

      let actions = jest.fn()

      let sr = new Route('name', {
        path: '/f/:sid',
        query: {
          potato: ':galaxy'
        },
        actions: actions
      })

      sr.matchPath(location)

      expect(actions.mock.calls[0][0]).toEqual({sid: '123456', galaxy: '321'})
      expect(actions.mock.calls[0][1]).toEqual(location)
    })
  })

  describe('stringifyFlat', () => {
    it('should stringify from an array of values instead of a params object', () => {
      let sr = new Route('name', {
        path: '/f/:sid',
        query: {
          potato: ':galaxy'
        }
      })

      expect(sr.stringifyFlat('1234', 'foo')).toEqual('/f/1234?potato=foo')
    })
  })
})
