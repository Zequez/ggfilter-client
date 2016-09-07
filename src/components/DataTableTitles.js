import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { adjustColumnWidth, clearColumnWidth } from 'stores/actions'
import { setSort } from 'stores/reducers/filterReducer'

const DataTableTitle = require('components/DataTableTitle')

@connect((s) => ({}), {
  setSort,
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

  render () {
    console.logRender('DataTableTitles')
    let { filters, filtersParams, sort, sortAsc, columnsWidth } = this.props

    let titles = filters.map((filter, i) => {
      let sortStatus = (sort === filter.name) ? sortAsc : null
      let width = columnsWidth[i]
      let hasParams = !!filtersParams[filter.name]

      return (
        <DataTableTitle
          key={filter.name}
          filter={filter}
          width={width}
          sort={sortStatus}
          active={hasParams}
          onSort={::this.onSort}
          onResize={::this.onResize}
          onResetResize={::this.onResetResize}/>
      )
    })

    return (
      <tr className='data-table-titles'>
        {titles}
      </tr>
    )
  }
}
