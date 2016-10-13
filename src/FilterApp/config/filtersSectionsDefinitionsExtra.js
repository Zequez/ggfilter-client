import filters from './filtersDefinitions'
import sections from './filtersSectionsDefinitions'
var extra = {}

for (let sectionName in sections) {
  extra[sectionName] =
    sections[sectionName].map((filterName)=> filters[filterName])
}

export default extra
