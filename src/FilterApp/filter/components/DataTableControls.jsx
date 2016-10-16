import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'
import { setFilter } from 'src/FilterApp/filter'

import ControlComponent from './ControlComponent'

@connect((s) => ({}), {
  setFilter
})
export default class DataTableControls extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,

    setFilter: t.func.isRequired
  }

  render () {
    console.logRender('DataTableControls')
    let { filters, filtersParams, setFilter } = this.props

    return (
      <tr className='data-table-controls'>
        {filters.map((filter) => (
          <ControlComponent
            key={filter.name}
            filter={filter}
            params={filtersParams[filter.name]}
            onChange={partial(setFilter, filter.name)}/>
        ))}
      </tr>
    )
  }
}
