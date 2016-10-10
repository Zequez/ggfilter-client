import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { adjustColumnWidth, clearColumnWidth } from 'stores/reducers/columnsWidthReducer'
import { setSort, setFilter } from 'stores/reducers/filterReducer'

import DataTableTitle from './DataTableTitle'

@connect((s) => ({}), {
  setSort,
  setFilter,
  adjustColumnWidth,
  clearColumnWidth
})
export default class DataTableTitles extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,
    sort: t.string.isRequired,
    sortAsc: t.bool.isRequired,
    columnsWidth: t.arrayOf(t.number).isRequired
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.filters !== p.filters ||
      np.filtersParams !== p.filtersParams ||
      np.columnsWidth.toString() !== p.columnsWidth.toString() ||
      np.sort !== p.sort ||
      np.sortAsc !== p.sortAsc
    )
  }

  onSort (filter, ev) {
    this.props.setSort(filter.sort)
  }

  onResize (filter, deltaX) {
    if (deltaX !== 0) {
      this.props.adjustColumnWidth(filter.name, deltaX)
    }
  }

  onResetResize (filter) {
    this.props.clearColumnWidth(filter.name)
  }

  onSetHighlightMode (filter, mode) {
    let params = this.props.filtersParams[filter.name]
    this.props.setFilter(filter.name, {...params, highlight: mode})
  }

  onClearFilter (filter) {
    this.props.setFilter(filter.name, null)
  }

  render () {
    console.logRender('DataTableTitles')
    let { filters, filtersParams, sort, sortAsc, columnsWidth } = this.props

    let titles = filters.map((filter, i) => {
      let sortStatus = (sort === filter.name) ? sortAsc : null
      let width = columnsWidth[i]
      let hasParams = !!filtersParams[filter.name]
      let highlightMode = hasParams ? !!filtersParams[filter.name].highlight : false

      return (
        <DataTableTitle
          key={filter.name}
          filter={filter}
          width={width}
          sort={sortStatus}
          active={hasParams}
          highlightMode={highlightMode}
          onSort={::this.onSort}
          onResize={::this.onResize}
          onResetResize={::this.onResetResize}
          onClearFilter={this.onClearFilter.bind(this, filter)}
          onSetHighlightMode={this.onSetHighlightMode.bind(this, filter)}/>
      )
    })

    return (
      <tr className='data-table-titles'>
        {titles}
      </tr>
    )
  }
}
