import th from '../theme'
import React, { Component, PropTypes as t } from 'react'

import ColumnsWidthFixer from './ColumnsWidthFixer'
import DataTableControls from '../filter/components/DataTableControls'
import DataTableTitles from '../filter/components/DataTableTitles'
import DataTableBatch from '../games/components/DataTableBatch'

export default class DataTable extends Component {
  static propTypes = {
    visibleFiltersDefinitions: t.arrayOf(t.object).isRequired,
    filter: t.shape({
      params: t.object.isRequired,
      sort: t.shape({
        filter: t.string.isRequired,
        asc: t.bool.isRequired
      }).isRequired
    }).isRequired,
    columnsWidth: t.arrayOf(t.number).isRequired,
    tableWidth: t.number.isRequired,
    games: t.shape({
      list: t.array,
      fetching: t.bool,
      failed: t.bool
    }).isRequired
  }

  render () {
    console.logRender('DataTable')
    let { filter, columnsWidth, tableWidth, games } = this.props
    let filters = this.props.visibleFiltersDefinitions

    let batches = []
    for (let i = 0; i < games.batches.length; ++i) {
      batches.push(
        <DataTableBatch
          key={i}
          games={games.batches[i]}
          filters={filters}
          filtersParams={filter.params}/>
      )
    }

    return (
      <table className={th.dataTable} style={{width: tableWidth}}>
        <thead>
          <ColumnsWidthFixer columnsWidth={columnsWidth}/>
          <DataTableTitles
            filters={filters}
            filtersParams={filter.params}
            sort={filter.sort.filter}
            sortAsc={filter.sort.asc}/>
          <DataTableControls
            filters={filters}
            filtersParams={this.props.filter.params}/>
        </thead>
        {batches}
      </table>
    )
  }
}
