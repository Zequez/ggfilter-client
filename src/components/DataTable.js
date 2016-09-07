import React, { Component, PropTypes as t } from 'react'

var debounce = require('lib/utils').debounce
var TableWidthCalculator = require('lib/TableWidthCalculator')

var DataTableControls = require('components/DataTableControls')
var DataTableTitles = require('components/DataTableTitles')
var DataTableBatch = require('components/DataTableBatch')

export default class DataTable extends Component {
  static propTypes = {
    visibleFiltersDefinitions: t.arrayOf(t.object).isRequired,
    filter: t.shape({
      visible: t.arrayOf(t.string),
      params: t.object,
      sort: t.string,
      sort_asc: t.bool
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
    console.info('Render <DataTable/>')
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
          <DataTableTitles
            filters={filters}
            filtersParams={filter.params}
            sort={filter.sort}
            sortAsc={filter.sort_asc}
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
