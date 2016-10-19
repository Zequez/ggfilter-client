import filtersDefinitions from '../config/filtersDefinitions'
import categoriesDefinitions from '../config/categoriesDefinitions'

class FilterDefinition {
  name = ''
  title = ''

  width = 100

  toggle = 'Base'
  toggleType = null

  control = 'Text'
  controlType = null
  controlOptions = {}

  column = 'Raw'
  columnActive = false
  columnInputs = null
  columnOptions = {}

  constructor (name, args) {
    this.name = name
    if (args.sort == null) this.sort = name
    if (!args.columnInputs) this.columnInputs = {value: name}

    for (let attr in args) {
      this[attr] = args[attr]
    }
  }
}

export class Definitions {
  filters = {}
  categories = {}
  categoriesWithFilters = {}
  sortedFilters = []
  sortedFiltersNames = []

  constructor (filtersDefinitions, categoriesDefinitions) {
    this._extendFilters(filtersDefinitions)
    this.filters = filtersDefinitions
    this.categories = categoriesDefinitions
    this._setCategoriesWithFilters()
    this._setSortedFilters()
    this._setSortedFiltersNames()
  }

  sortParams (params) {
    let newParams = {}
    let names = Object.keys(params)
    this.sortNames(names)
      .forEach((name) => {
        newParams[name] = params[name]
      })
    return newParams
  }

  sortNames (names) {
    return this.sortedFiltersNames.filter((v) => names.indexOf(v) !== -1)
  }

  _extendFilters (filtersDefinitions) {
    for (let name in filtersDefinitions) {
      filtersDefinitions[name] = new FilterDefinition(name, filtersDefinitions[name])
    }
  }

  _sortedFilters () {
    let flatDefinitions = []
    for (let section in this.categories) {
      flatDefinitions = flatDefinitions.concat(this.filters[section])
    }
  }

  _setCategoriesWithFilters () {
    for (let cat in this.categories) {
      this.categoriesWithFilters[cat] =
        this.categories[cat].map((filterName) => this.filters[filterName])
    }
  }

  _setSortedFilters () {
    this.sortedFilters = Object.values(this.categoriesWithFilters)
      .reduce((filters, moreFilters) => filters.concat(moreFilters))
  }

  _setSortedFiltersNames () {
    this.sortedFiltersNames = this.sortedFilters.map((f) => f.name)
  }
}

export default new Definitions(filtersDefinitions, categoriesDefinitions)
