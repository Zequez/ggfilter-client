import generateAutoTitle from './generateAutoTitle'
import defaultFilter from '../config/defaultFilter'
import filtersDefinitions from '../config/filtersDefinitions'

describe('generateAutoTitle', () => {
  it('should generate a basic title based on a single filter', () => {
    let title = generateAutoTitle({params: {superFilter: {value: 123}}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).to.equal('Games SUPER TITLE! 123')
  })

  it('should generate a title based on multiple filters', () => {
    let title = generateAutoTitle(
      {params: {superFilter: {value: 123}, megaTitle: {value: 321}}},
      {
        superFilter: (p) => 'SUPER TITLE! ' + p.value,
        megaTitle: (p) => 'MEGA TITLE! ' + p.value
      }
    )
    expect(title).to.equal('Games SUPER TITLE! 123, MEGA TITLE! 321')
  })

  it('should use the order of the filter titles definitions', () => {
    let title = generateAutoTitle(
      {params: {superFilter: {value: 123}, megaTitle: {value: 321}}},
      {
        megaTitle: (p) => 'MEGA TITLE! ' + p.value,
        superFilter: (p) => 'SUPER TITLE! ' + p.value
      }
    )
    expect(title).to.equal('Games MEGA TITLE! 321, SUPER TITLE! 123')
  })

  it('should capitalize the first letter of the title', () => {
    let title = generateAutoTitle({params: {superFilter: {}, megaTitle: {}}}, {
      superFilter: (p) => 'super',
      megaTitle: (p) => 'mega'
    })
    expect(title).to.equal('Games super, mega')
  })

  it('should pass the store to the definition', () => {
    let title = generateAutoTitle({params: {superFilter: {}}}, {
      superFilter: (p, store) => store.potato
    }, {potato: 'YEAAAAH!'})

    expect(title).to.equal('Games YEAAAAH!')
  })

  it('should interpolate and escape the returned values from the definition', () => {
    let title = generateAutoTitle({params: {superFilter: {value: '<script>rsarsa</script>'}}}, {
      superFilter: (p) => ['Potato! %s', p.value]
    })
    expect(title).to.equal('Games Potato! &lt;script&gt;rsarsa&lt;/script&gt;')
  })

  it('should replace all the values surrounded by <> with <strong>', () => {
    let title = generateAutoTitle({params: {superFilter: {}}}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).to.equal('Games SUPER <strong>TITLE</strong>!')
  })

  it('should return null if there are no filters and no sorting', () => {
    let title = generateAutoTitle({params: {}}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).to.equal(null)
  })

  it('should also return null if there are no filters and sorting is the default', () => {
    let title = generateAutoTitle({params: {}, sort: 'name'}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).to.equal(null)
  })

  describe('sorting order', () => {
    it("should not add the sorting order if it's undefined", () => {
      let title = generateAutoTitle({params: {supa: {}}}, {
        supa: () => 'yup'
      })
      expect(title).to.equal('Games yup')
    })

    it("should not add the sorting order if it's the default", () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: defaultFilter.sort, sortAsc: true}, {
        supa: () => 'yup'
      })
      expect(title).to.equal('Games yup')
    })

    it('should add the sorting order ascending', () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: 'steam_id', sortAsc: true}, {
        supa: () => 'yup'
      })
      expect(title).to.equal(`Games yup, sorted by <strong>${filtersDefinitions.steam_id.title} in ascending order</strong>`)
    })

    it('should add the sorting order descending', () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: 'steam_id', sortAsc: false}, {
        supa: () => 'yup'
      })
      expect(title).to.equal(`Games yup, sorted by <strong>${filtersDefinitions.steam_id.title} in descending order</strong>`)
    })
  })
})
