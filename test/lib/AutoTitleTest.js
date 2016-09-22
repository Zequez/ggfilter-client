import generateAutoTitle from 'lib/AutoTitle'

describe('generateAutoTitle', () => {
  it('should generate a basic title based on a single filter', () => {
    let title = generateAutoTitle({superFilter: {value: 123}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).to.equal('SUPER TITLE! 123')
  })

  it('should generate a title based on multiple filters', () => {
    let title = generateAutoTitle({superFilter: {value: 123}, megaTitle: {value: 321}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value,
      megaTitle: (p) => 'MEGA TITLE! ' + p.value
    })
    expect(title).to.equal('SUPER TITLE! 123, MEGA TITLE! 321')
  })

  it('should use the order of the filter titles definitions', () => {
    let title = generateAutoTitle({superFilter: {value: 123}, megaTitle: {value: 321}}, {
      megaTitle: (p) => 'MEGA TITLE! ' + p.value,
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).to.equal('MEGA TITLE! 321, SUPER TITLE! 123')
  })

  it('should allow interpolation of the filters instead o a function', () => {
    let title = generateAutoTitle({superFilter: {value: 123}}, {
      superFilter: 'SUPER TITLE! {value}'
    })
    expect(title).to.equal('SUPER TITLE! 123')
  })
})
