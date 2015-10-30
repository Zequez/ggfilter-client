var React = require('react')
var connect = require('react-redux').connect

var FiltersTogglesSection = require('./FiltersTogglesSection')

var filters = require('sources/filtersDefinitions')
var filtersSections = require('sources/filtersSectionsDefinitions')

import { toggleFilter } from 'stores/actions'

class FiltersToggles extends React.Component {
  // Return an array with the filters of a section
  sectionFilters(sectionName) {
    return filtersSections[sectionName].map((filterName)=>{
      return filters[filterName]
    })
  }

  // Returns an array of section elements
  sectionsEls() {
    var sections = []
    for(var sectionName in filtersSections) {
      sections.push(this.sectionEl(sectionName))
    }
    return sections
  }

  // Returns a section element
  sectionEl(sectionName) {
    return (
      <li key={sectionName} className='filters-toggles-section'>
        <h3>{sectionName}</h3>
        <ul>{this.sectionTogglesEls(sectionName)}</ul>
      </li>
    )
  }

  // Returns an array of toggle elements of a section
  sectionTogglesEls(sectionName) {
    var filters = this.sectionFilters(sectionName)
    var toggles = []
    for(let i = 0; i < filters.length; i++) {
      toggles.push(this.toggleEl(filters[i]))
    }
    return toggles
  }

  // Returns a toggle element
  toggleEl(filter) {
    return (
      <filter.toggle
        key={filter.name}
        active={this.props.toggledFilters.indexOf(filter.name) != -1}
        filter={filter}/>
    )
  }

  render() {
    return (
      <ul className='filters-toggles'>
        {this.sectionsEls()}
      </ul>
    )
  }
}

FiltersToggles.propTypes = {
  toggledFilters: React.PropTypes.array.isRequired
}

export default FiltersToggles
