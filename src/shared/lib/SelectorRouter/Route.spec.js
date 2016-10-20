import Route from './Route'

describe('SelectorRouter/Route', () => {
  describe('stringifyArray', () => {
    it('should stringify the pattern based on an array of values', () => {
      let sr = new Route('name', '/:foo/:bar/potato/:salad', [], [])

      expect(sr.stringifyArray([true, true, 1, 123, 321, 'HEY', 'weon']))
        .to.equal('/321/HEY/potato/weon')
    })
  })

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
      let selectors = [
        [modeSelector, 'potato'],
        [dirtySelector],
        [sfilterSelector, (sf) => sf.sid]
      ]
      let sr = new Route('name', '/f/:sid', selectors, [])

      expect(sr.matchState(state))
        .to.equal('/f/12345')
    })

    it('should not match if any selector returns false', () => {
      let selectors = [
        [modeSelector, 'potato'],
        [dirtySelector],
        [sfilterSelector, (sf) => false]
      ]
      let sr = new Route('name', '/f/:sid', selectors, [])
      expect(sr.matchState(state))
        .to.equal(null)
    })

    it('should continue matching with false selectors with the force option', () => {
      let dirtySelector = (s) => false
      let selectors = [
        [modeSelector, 'potato'],
        [dirtySelector],
        [sfilterSelector, (sf) => sf.sid]
      ]
      let sr = new Route('name', '/f/:sid', selectors, [])
      expect(sr.matchState(state, true))
        .to.equal('/f/12345')
    })
  })

  describe('matchPath', () => {
    it('should return the list of decorated actions if matches', () => {
      let objectAction = {type: 'SET_MODE', mode: 'potato'}
      let funAction = (sid) => ({type: 'SET_SID', sid})

      let sr = new Route('name', '/f/:sid', [], [objectAction, funAction])

      expect(sr.matchPath('/f/123456'))
        .to.deep.equal([
          {type: 'SET_MODE', mode: 'potato'},
          {type: 'SET_SID', sid: '123456'}
        ])
    })
  })
})
