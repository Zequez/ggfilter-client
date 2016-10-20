import { Definitions } from './definitions'

describe('FilterApp/lib/definitions', () => {
  let filters, categories, def
  beforeEach(() => {
    filters = {
      bar: {title: 'Bar filter'},
      foo: {title: 'Foo filter'},
      potato: {title: 'Potato filter'}
    }
    categories = {'Hello': ['potato', 'bar'], 'Bye': ['foo']}
    def = new Definitions(filters, categories)
  })

  it('should expose the extended definitions in .filters', () => {
    expect(def.filters.potato.title).toBe(filters.potato.title)
    expect(def.filters.potato.name).toBe('potato')
  })

  it('should expose the categories in .categories', () => {
    expect(def.categories).toBe(categories)
  })

  it('should expose the categories with filters in .categoriesWithFilters', () => {
    expect(def.categoriesWithFilters['Hello'][0]).toBe(def.filters.potato)
  })

  it('should expose the filters in the order given by the categories in .sortedFilters', () => {
    expect(def.sortedFilters[0]).toBe(def.filters.potato)
    expect(def.sortedFilters[1]).toBe(def.filters.bar)
    expect(def.sortedFilters[2]).toBe(def.filters.foo)
  })

  it('should expose the filters names in the order given by the categories in .sortedFiltersNames', () => {
    expect(def.sortedFiltersNames[0]).toBe('potato')
    expect(def.sortedFiltersNames[1]).toBe('bar')
    expect(def.sortedFiltersNames[2]).toBe('foo')
  })

  it('should allow you to sort params by the filters order', () => {
    expect(Object.keys(def.sortParams({
      bar: { value: true },
      foo: { value: true },
      potato: { value: true }
    }))).toEqual(['potato', 'bar', 'foo'])
  })
})
