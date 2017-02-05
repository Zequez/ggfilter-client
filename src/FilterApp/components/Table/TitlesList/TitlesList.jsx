import th from './TitlesList.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { setSorting } from '../../../filter/actions'

import WrappedTitle from './WrappedTitle'

@connect((s) => ({}), {
  setSorting
})
export default class TitlesList extends Component {
  static propTypes = {
    columns: t.arrayOf(t.object).isRequired,
    columnsParams: t.object.isRequired,
    sorting: t.shape({
      column: t.string,
      direction: t.bool
    }).isRequired,
    setSorting: t.func
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.columns !== p.columns ||
      np.columnsParams !== p.columnsParams ||
      np.sorting.column !== p.sorting.column ||
      np.sorting.direction !== p.sorting.direction
    )
  }

  onSort = (column, ev) => {
    let sorting = this.props.sorting
    if (sorting.column === column.name) {
      this.props.setSorting(column.name, !sorting.direction)
    } else {
      this.props.setSorting(column.name, true)
    }
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
          onSort={this.onSort}/>
      )
    })

    return (
      <tr className={th.TitlesList}>
        {titles}
      </tr>
    )
  }
}
