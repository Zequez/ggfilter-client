import QueryPattern from './QueryPattern'

describe('QueryPattern', () => {
  describe('#match', () => {
    it('matches basic patterns', () => {
      let qp = new QueryPattern({b: ':b64'})
      expect(qp.match({b: '12345'})).toEqual({b64: '12345'})
    })

    it('matches a multi pattern', () => {
      let qp = new QueryPattern({a: ':potato', b: ':b64'})
      expect(qp.match({b: '12345', a: 'hello'})).toEqual({
        b64: '12345',
        potato: 'hello'
      })
    })

    it('returns a null object with a missmatch', () => {
      let qp = new QueryPattern({b: ':b64'})
      expect(qp.match({k: '12345'})).toEqual(null)
    })

    it('returns a null object with any missmatch in a multipattern', () => {
      let qp = new QueryPattern({a: ':potato', b: ':b64'})
      expect(qp.match({b: '12345'})).toEqual(null)
    })

    it('should allow conditional params', () => {
      let qp = new QueryPattern({b: '(:b64)'})
      expect(qp.match({k: '12345'})).toEqual({b64: null})
    })

    it('should allow conditional params in multipatterns', () => {
      let qp = new QueryPattern({a: '(:potato)', b: ':b64'})
      expect(qp.match({b: '12345'})).toEqual({b64: '12345', potato: null})
    })
  })

  describe('#stringify', () => {
    it('stringifies basic patterns', () => {
      let qp = new QueryPattern({b: ':b64'})
      expect(qp.stringify({b64: '12345'})).toEqual('b=12345')
    })

    it('stringifies a multi pattern', () => {
      let qp = new QueryPattern({a: ':potato', b: ':b64'})
      expect(qp.stringify({b64: '12345', potato: 'hello'})).toEqual(
        'b=12345&a=hello'
      )
    })

    it('stringifies a partial pattern', () => {
      let qp = new QueryPattern({a: ':potato', b: ':b64'})
      expect(qp.stringify({b64: '12345'})).toEqual('b=12345')
    })

    it('ignores falsy params', () => {
      let qp = new QueryPattern({a: ':potato', b: ':b64'})
      expect(qp.stringify({b64: null})).toEqual('')
    })

    it('ignores params not in the list', () => {
      let qp = new QueryPattern({a: ':potato'})
      expect(qp.stringify({potato: '12345', foo: 'bar'})).toEqual(
        'a=12345'
      )
    })
  })
})
