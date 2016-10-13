import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import filtersDefinitions from '../../config/filtersDefinitions'
import filtersSections from '../../config/filtersSectionsDefinitions'

import { toggle } from '../reducer'

@connect((s) => ({toggledFilters: s.filter.visible}), {
  toggle
})
export default class FiltersToggles extends Component {
  static propTypes = {
    toggledFilters: t.arrayOf(t.string).isRequired,
    toggle: t.func.isRequired
  }

  toggleEl (filterName) {
    let active = this.props.toggledFilters.indexOf(filterName) !== -1
    let filter = filtersDefinitions[filterName]
    return <filter.toggle key={filter.name} toggle={this.props.toggle} active={active} filter={filter}/>
  }

  render () {
    console.logRender('FiltersToggles')

    let sectionsElements = []
    for (let sectionName in filtersSections) {
      sectionsElements.push(
        <li key={sectionName} className='filters-toggles-section'>
          <h3>{sectionName}</h3>
          <ul>
            {filtersSections[sectionName].map((filterName) => this.toggleEl(filterName))}
          </ul>
        </li>
      )
    }

    return (
      <ul className='filters-toggles'>
        {sectionsElements}
      </ul>
    )
  }
}
