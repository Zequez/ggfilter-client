import generateAutoTitle from 'lib/AutoTitle'

describe('generateAutoTitle', () => {
  it('should generate a basic title based on a single filter', () => {
    let title = generateAutoTitle({superFilter: {value: 123}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).to.equal('Games SUPER TITLE! 123')
  })

  it('should generate a title based on multiple filters', () => {
    let title = generateAutoTitle({superFilter: {value: 123}, megaTitle: {value: 321}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value,
      megaTitle: (p) => 'MEGA TITLE! ' + p.value
    })
    expect(title).to.equal('Games SUPER TITLE! 123, MEGA TITLE! 321')
  })

  it('should use the order of the filter titles definitions', () => {
    let title = generateAutoTitle({superFilter: {value: 123}, megaTitle: {value: 321}}, {
      megaTitle: (p) => 'MEGA TITLE! ' + p.value,
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).to.equal('Games MEGA TITLE! 321, SUPER TITLE! 123')
  })

  it('should capitalize the first letter of the title', () => {
    let title = generateAutoTitle({superFilter: {}, megaTitle: {}}, {
      superFilter: (p) => 'super',
      megaTitle: (p) => 'mega'
    })
    expect(title).to.equal('Games super, mega')
  })

  it('should pass the store to the definition', () => {
    let title = generateAutoTitle({superFilter: {}}, {
      superFilter: (p, store) => store.potato
    }, {potato: 'YEAAAAH!'})

    expect(title).to.equal('Games YEAAAAH!')
  })

  it('should interpolate and escape the returned values from the definition', () => {
    let title = generateAutoTitle({superFilter: {value: '<script>rsarsa</script>'}}, {
      superFilter: (p) => ['Potato! %s', p.value]
    })
    expect(title).to.equal('Games Potato! &lt;script&gt;rsarsa&lt;/script&gt;')
  })

  it('should replace all the values surrounded by <> with <strong>', () => {
    let title = generateAutoTitle({superFilter: {}}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).to.equal('Games SUPER <strong>TITLE</strong>!')
  })
})
