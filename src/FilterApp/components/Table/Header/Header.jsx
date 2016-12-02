import th from '../theme'
import React, { PropTypes as t, Component } from 'react'

import ColumnsWidthFixator from './ColumnsWidthFixator'
import ControlsList from './ControlsList'
import TitlesList from './TitlesList'

export default class Header extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filter: t.shape({
      params: t.object.isRequired,
      sort: t.shape({
        filter: t.string.isRequired,
        asc: t.bool.isRequired
      }).isRequired
    }).isRequired,
    // columnsWidth: t.arrayOf(t.number).isRequired
  }

  render () {
    let { filter, columnsWidth, filters } = this.props

    return (
      <thead className={th.header}>
        <ColumnsWidthFixator visibleFiltersDefinitions={filters}/>
        <TitlesList
          filters={filters}
          filtersParams={filter.params}
          sort={filter.sort.filter}
          sortAsc={filter.sort.asc}/>
        <ControlsList
          filters={filters}
          filtersParams={filter.params}/>
      </thead>
    )
  }
}
