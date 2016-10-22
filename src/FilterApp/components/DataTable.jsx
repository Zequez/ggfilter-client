import React, { Component, PropTypes as t } from 'react'

var debounce = require('shared/lib/utils').debounce
import TableWidthCalculator from '../ui/lib/TableWidthCalculator'

import ColumnsWidthFixer from './ColumnsWidthFixer'
import CategoriesColumns from './CategoriesColumns'
import DataTableControls from '../filter/components/DataTableControls'
import DataTableTitles from '../filter/components/DataTableTitles'
import DataTableBatch from '../games/components/DataTableBatch'

export default class DataTable extends Component {
  static propTypes = {
    visibleFiltersDefinitions: t.arrayOf(t.object).isRequired,
    filter: t.shape({
      params: t.object.isRequired,
      sort: t.shape({
        column: t.string.isRequired,
        asc: t.bool.isRequired
      }).isRequired
    }).isRequired,
    columnsWidth: t.object.isRequired,
    games: t.shape({
      list: t.array,
      fetching: t.bool,
      failed: t.bool
    }).isRequired
  }

  componentDidMount () {
    window.addEventListener('resize', debounce(250, this.handleWindowResize.bind(this)))
  }

  handleWindowResize (ev) {
    this.forceUpdate()
  }

  render () {
    console.logRender('DataTable')
    let { filter, columnsWidth, games } = this.props
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

    let docSize = document.documentElement.clientWidth
    let calc = new TableWidthCalculator(filters, columnsWidth, docSize)
    let trueColumnsWidth = calc.columnsWidth()
    let tableWidth = calc.tableWidth()

    return (
      <table className='data-table' style={{width: tableWidth}}>
        <thead>
          <ColumnsWidthFixer columnsWidth={trueColumnsWidth}/>
          <CategoriesColumns/>
          <DataTableTitles
            filters={filters}
            filtersParams={filter.params}
            sort={filter.sort.column}
            sortAsc={filter.sort.asc}
            columnsWidth={trueColumnsWidth}/>
          <DataTableControls
            filters={filters}
            filtersParams={this.props.filter.params}/>
        </thead>
        {batches}
      </table>
    )
  }
}
