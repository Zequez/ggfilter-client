import filtersDefinitions from '../config/filtersDefinitions'
import categoriesDefinitions from '../config/categoriesDefinitions'

class FilterDefinition {
  id = null
  name = ''
  title = ''
  longtitle = null

  width = 100
  alignment = -1

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
  categoriesList = []
  categoriesWithFilters = {}
  sortedFilters = []
  sortedFiltersNames = []
  byId = {}

  constructor (filtersDefinitions, categoriesDefinitions) {
    this._extendFilters(filtersDefinitions)
    this._extendCategories(categoriesDefinitions)
    this.filters = filtersDefinitions
    this.categories = categoriesDefinitions
    this._setCategoriesWithFilters()
    this._setSortedFilters()
    this._setSortedFiltersNames()
  }

  normalizeParamsOrder (params, addMissing = true) {
    let newParams = {}
    let sortedNames = addMissing
      ? this.sortedFiltersNames
      : this.sortNames(Object.keys(params))
    sortedNames.forEach((name) => {
      newParams[name] = params[name] || false
    })
    return newParams
  }

  sortNames (names) {
    return this.sortedFiltersNames.filter((v) => names.indexOf(v) !== -1)
  }

  _extendFilters (filtersDefinitions) {
    for (let name in filtersDefinitions) {
      let def = new FilterDefinition(name, filtersDefinitions[name])
      filtersDefinitions[name] = def
      this.byId[def.id] = name
    }
  }

  _extendCategories (categoriesDefinitions) {
    for (let name in categoriesDefinitions) {
      categoriesDefinitions[name].name = name
      this.categoriesList.push(categoriesDefinitions[name])
    }
  }

  _setCategoriesWithFilters () {
    for (let cat in this.categories) {
      this.categoriesWithFilters[cat] =
        this.categories[cat].filters.map((filterName) => this.filters[filterName])
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
