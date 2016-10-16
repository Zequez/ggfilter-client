`import objectBreadcrumbs from './objectBreadcrumbs'`
`import StatePattern from './StatePattern'`

describe 'objectBreadcrumbs', ->
  it 'should work with a basic object', ->
    expect(objectBreadcrumbs({mode: 'yes'})).to.deep.equal([['mode', 'yes']])

  it 'should work with multi key objects', ->
    expect(objectBreadcrumbs({mode: 'yes', potato: 'no'})).to.deep.equal([['mode', 'yes'], ['potato', 'no']])

  it 'should work with deep nested objects', ->
    expect(objectBreadcrumbs({mode: 'yes', filter: { type: 'sid', sid: ':potatoSalad' }}))
      .to.deep.equal([['mode', 'yes'], ['filter', 'type', 'sid'], ['filter', 'sid', ':potatoSalad']])


describe 'StatePattern', ->
  it 'should match a basic store', ->
    sp = new StatePattern({mode: 'yes'}, [])

    expect(sp.match({mode: 'yes', a: 'b'})).to.deep.equal({})
    expect(sp.match({mode: 'no', a: 'b'})).to.equal(null)

  it 'should match with a multi values', ->
    sp = new StatePattern({mode: 'yes', type: 'truck'})

    expect(sp.match({mode: 'yes', type: 'truck', a: 'b'})).to.deep.equal({})
    expect(sp.match({mode: 'no', type: 'truck', a: 'b'})).to.equal(null)

  it 'should match with patterns', ->
    sp = new StatePattern({mode: 'yes', potato: ':salad'})

    expect(sp.match({mode: 'yes', potato: 'GALAXY!', a: 'b'})).to.deep.equal({salad: 'GALAXY!'})
    expect(sp.match({mode: 'no', potato: 'GALAXY!', a: 'b'})).to.deep.equal(null)
