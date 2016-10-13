import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { setFilter } from 'src/FilterApp/filter'

import classNames from 'classnames'

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
        onChange: this.props.setFilter.bind(this, filter.name)
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
