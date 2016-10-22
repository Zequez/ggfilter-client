import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'

import definitions from '../../lib/definitions'
import { visibleFiltersSelector } from '../selectors'
import { setParam } from '../reducer'

import ToggleComponent from './ToggleComponent'

@connect((s) => ({
  toggledFilters: visibleFiltersSelector(s)
}), {
  toggle: setParam
})
export default class FiltersToggles extends Component {
  static propTypes = {
    toggledFilters: t.arrayOf(t.string).isRequired,
    toggle: t.func.isRequired
  }

  render () {
    console.logRender('FiltersToggles')
    let { toggledFilters } = this.props

    return (
      <ul className='filters-toggles'>
        {definitions.categoriesList.map((cat) =>
          <li key={cat.name} className='filters-toggles-section'>
            <h3>{cat.title}</h3>
            <ul>
              {definitions.categoriesWithFilters[cat.name].map((filter) =>
                <ToggleComponent
                  key={filter.name}
                  filter={filter}
                  active={toggledFilters.indexOf(filter.name) !== -1}
                  onToggle={partial(this.props.toggle, filter.name)}/>
              )}
            </ul>
          </li>
        )}
      </ul>
    )
  }
}
