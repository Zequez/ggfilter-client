var React = require('react')

var FiltersTogglesSection = require('./FiltersTogglesSection')

var filters = require('sources/filtersDefinitions')
var filtersSections = require('sources/filtersSectionsDefinitions')

class FiltersToggles extends React.Component {
  sectionFilters(section) {
    return filtersSections[section].map((filterName)=>{
      return filters[filterName]
    })
  }

  render() {
    var sectionsComponents = []
    for (let section in filtersSections) {
      sectionsComponents.push(
        <FiltersTogglesSection
          key={section}
          title={section}
          filters={this.sectionFilters(section)}/>
      )
    }

    return (
      <ul className='filters-toggles'>
        {sectionsComponents}
      </ul>
    )
  }
}

export default FiltersToggles
