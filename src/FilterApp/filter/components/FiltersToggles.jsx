import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'

import filtersDefinitions from '../../config/filtersDefinitions'
import filtersSections from '../../config/filtersSectionsDefinitions'

import { toggle } from '../reducer'

import ToggleComponent from './ToggleComponent'

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
    let { toggledFilters } = this.props

    return (
      <ul className='filters-toggles'>
        {Object.keys(filtersSections).map((sectionName) =>
          <li key={sectionName} className='filters-toggles-section'>
            <h3>{sectionName}</h3>
            <ul>
              {filtersSections[sectionName].map((filterName) =>
                <ToggleComponent
                  key={filterName}
                  filter={filtersDefinitions[filterName]}
                  active={toggledFilters.indexOf(filterName) !== -1}
                  onToggle={partial(this.props.toggle, filterName)}/>
              )}
            </ul>
          </li>
        )}
      </ul>
    )
  }
}
