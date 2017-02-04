import th from './TitlesList.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { adjustColumnWidth, clearColumnWidth } from '../../../ui/reducer'
import { setSort, setParam } from '../../../filter/reducer'

import WrappedTitle from './WrappedTitle'

@connect((s) => ({}), {
  setSort,
  setParam,
  adjustColumnWidth,
  clearColumnWidth
})
export default class TitlesList extends Component {
  static propTypes = {
    columns: t.arrayOf(t.object).isRequired,
    columnsParams: t.object.isRequired,
    sorting: t.shape({
      column: t.string,
      direction: t.bool
    }).isRequired,
    // sort: t.string.isRequired,
    // sortAsc: t.bool.isRequired,

    setSort: t.func.isRequired,
    setParam: t.func.isRequired,
    adjustColumnWidth: t.func.isRequired,
    clearColumnWidth: t.func.isRequired
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.columns !== p.columns ||
      np.columnsParams !== p.columnsParams ||
      np.columnsWidth.toString() !== p.columnsWidth.toString() ||
      np.sorting.column !== p.sorting.column ||
      np.sorting.direction !== p.sorting.direction
    )
  }

  onSort (filter, ev) {
    let asc = this.props.sort === filter.sort ? !this.props.sortAsc : true
    this.props.setSort(filter.sort, asc)
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
    this.props.setParam(filter.name, {...params, hl: mode})
  }

  onClearFilter (filter) {
    this.props.setParam(filter.name, true)
  }

  render () {
    console.logRender('DataTableTitles')
    let { columns, columnsParams, sorting } = this.props

    let titles = columns.map((column, i) => {
      let sortStatus = (sorting.column === column.name) ? sorting.direction : null
      let hasParams = !!columnsParams[column.name]
      // let highlightMode = hasParams ? !!filtersParams[filter.name].hl : false

      return (
        <WrappedTitle
          key={column.name}
          column={column}
          sort={sortStatus}
          active={hasParams}
          highlightMode={false}
          onSort={::this.onSort}/>
      )
    })

    return (
      <tr className={th.TitlesList}>
        {titles}
      </tr>
    )
  }
}
