var definitions = require('./filtersSectionsDefinitions')
var filters = require('./filtersDefinitions')

var flatDefinitions = []
for (let section in definitions) {
  flatDefinitions = flatDefinitions.concat(definitions[section])
}

var filtersNames = []
for (let filterName in filters) {
  filtersNames.push(filterName)
}

var filtersWithoutSection = filtersNames.filter((v)=> flatDefinitions.indexOf(v) == -1)
if (filtersWithoutSection.length) {
  // THIS IS BAD, DO NOT DO THIS
  definitions['Other'] = filtersWithoutSection
}

export default function filtersSectionsFlatSort(currentFilters, newFilter) {
  return flatDefinitions.filter((v)=> currentFilters.indexOf(v) != -1 || newFilter == v )
}
