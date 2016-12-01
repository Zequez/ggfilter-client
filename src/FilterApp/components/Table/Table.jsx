import th from './theme'
import React, { Component, PropTypes as t } from 'react'

import Header from './Header/Header'
import Body from './Body/Body'

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
    let { filter, columnsWidth, tableWidth,
      games, visibleFiltersDefinitions: filters } = this.props

    return (
      <table className={th.table} style={{width: tableWidth}}>
        <Header filters={filters} filter={filter} columnsWidth={columnsWidth}/>
        {/*{Body({games, filters, filter})}*/}
      </table>
    )
  }
}
