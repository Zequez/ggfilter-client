import filtersDefinitions from './filtersDefinitions'
import filtersDefinitions from './filtersDefinitions'

let categories = {}
for (let filterName in filtersDefinitions) {
  let filter = filtersDefinitions[filterName]
  categories[filter.category] = categories[filter.category] || []
  categories[filter.category].push(filter)
}

export default categories
