import th from './Table.sass'
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
    }).isRequired
  }

  render () {
    let { filter, filters } = this.props

    return (
      <thead className={th.Table__Header}>
        <ColumnsWidthFixator visibleFiltersDefinitions={filters}/>
        <ControlsList
          filters={filters}
          filtersParams={filter.params}/>
        <TitlesList
          filters={filters}
          filtersParams={filter.params}
          sort={filter.sort.filter}
          sortAsc={filter.sort.asc}/>
      </thead>
    )
  }
}
