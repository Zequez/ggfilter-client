import generateAutoTitle from './generateAutoTitle'
import defaultFilter from '../config/defaultFilter'
import definitions from '../lib/definitions'

describe('generateAutoTitle', () => {
  it('should generate a basic title based on a single filter', () => {
    let title = generateAutoTitle({params: {superFilter: {value: 123}}}, {
      superFilter: (p) => 'SUPER TITLE! ' + p.value
    })
    expect(title).toBe('Games SUPER TITLE! 123')
  })

  it('should ignore true/false titles that do not have params', () => {
    let title = generateAutoTitle(
      {params: {superFilter: {value: 123}, megaTitle: {value: 321}, other: true, anything: false}},
      {
        superFilter: (p) => 'SUPER TITLE! ' + p.value,
        megaTitle: (p) => 'MEGA TITLE! ' + p.value,
        other: (p) => 'other',
        anything: (p) => 'anything'
      }
    )
    expect(title).toBe('Games SUPER TITLE! 123, MEGA TITLE! 321')
  })

  it('should generate a title based on multiple filters', () => {
    let title = generateAutoTitle(
      {params: {superFilter: {value: 123}, megaTitle: {value: 321}}},
      {
        superFilter: (p) => 'SUPER TITLE! ' + p.value,
        megaTitle: (p) => 'MEGA TITLE! ' + p.value
      }
    )
    expect(title).toBe('Games SUPER TITLE! 123, MEGA TITLE! 321')
  })

  it('should use the order of the filter titles definitions', () => {
    let title = generateAutoTitle(
      {params: {superFilter: {value: 123}, megaTitle: {value: 321}}},
      {
        megaTitle: (p) => 'MEGA TITLE! ' + p.value,
        superFilter: (p) => 'SUPER TITLE! ' + p.value
      }
    )
    expect(title).toBe('Games MEGA TITLE! 321, SUPER TITLE! 123')
  })

  it('should capitalize the first letter of the title', () => {
    let title = generateAutoTitle({params: {superFilter: {}, megaTitle: {}}}, {
      superFilter: (p) => 'super',
      megaTitle: (p) => 'mega'
    })
    expect(title).toBe('Games super, mega')
  })

  it('should pass the store to the definition', () => {
    let title = generateAutoTitle({params: {superFilter: {}}}, {
      superFilter: (p, store) => store.potato
    }, {potato: 'YEAAAAH!'})

    expect(title).toBe('Games YEAAAAH!')
  })

  it('should interpolate and escape the returned values from the definition', () => {
    let title = generateAutoTitle({params: {superFilter: {value: '<script>rsarsa</script>'}}}, {
      superFilter: (p) => ['Potato! %s', p.value]
    })
    expect(title).toBe('Games Potato! &lt;script&gt;rsarsa&lt;/script&gt;')
  })

  it('should replace all the values surrounded by <> with <strong>', () => {
    let title = generateAutoTitle({params: {superFilter: {}}}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).toBe('Games SUPER <strong>TITLE</strong>!')
  })

  it('should return null if there are no filters and no sorting', () => {
    let title = generateAutoTitle({params: {}}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).toBe(null)
  })

  it('should also return null if there are no filters and sorting is the default', () => {
    let title = generateAutoTitle({params: {}, sort: defaultFilter.sort}, {
      superFilter: () => 'SUPER <TITLE>!'
    })
    expect(title).toBe(null)
  })

  describe('sorting order', () => {
    it("should not add the sorting order if it's undefined", () => {
      let title = generateAutoTitle({params: {supa: {}}}, {
        supa: () => 'yup'
      })
      expect(title).toBe('Games yup')
    })

    it("should not add the sorting order if it's the default", () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: defaultFilter.sort}, {
        supa: () => 'yup'
      })
      expect(title).toBe('Games yup')
    })

    it('should add the sorting order ascending', () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: {column: 'steam_id', asc: true}}, {
        supa: () => 'yup'
      })
      expect(title).toBe(`Games yup, sorted by <strong>${definitions.filters.steam_id.title} in ascending order</strong>`)
    })

    it('should add the sorting order descending', () => {
      let title = generateAutoTitle({params: {supa: {}}, sort: {column: 'steam_id', asc: false}}, {
        supa: () => 'yup'
      })
      expect(title).toBe(`Games yup, sorted by <strong>${definitions.filters.steam_id.title} in descending order</strong>`)
    })
  })
})
