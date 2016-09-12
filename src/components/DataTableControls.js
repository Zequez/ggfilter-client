import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { setFilter, clearFilter } from 'stores/reducers/filterReducer'

import classNames from 'classnames'

@connect((s) => ({}), {
  setFilter,
  clearFilter
})
export default class DataTableControls extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,

    setFilter: t.func.isRequired,
    clearFilter: t.func.isRequired
  }

  handleFilterChange (filterName, data) {
    if (data) {
      // data.highlight = false
      this.props.setFilter(filterName, data)
    } else {
      this.props.clearFilter(filterName)
    }
  }

  render () {
    console.logRender('DataTableControls')
    let { filters, filtersParams } = this.props

    let controls = filters.map((filter) => {
      let params = filtersParams[filter.name]

      let controlClass = classNames({
        [filter.name]: true,
        'filter-control': true,
        [filter.filterType]: true
      })

      let filterProps = {
        query: params,
        name: filter.name,
        options: filter.filterOptions,
        onChange: this.handleFilterChange.bind(this, filter.name)
      }

      return (
        <th key={filter.name} className={controlClass}>
          <filter.filter {...filterProps}/>
        </th>
      )
    })

    return (
      <tr className='data-table-controls'>
        {controls}
      </tr>
    )
  }
}
