import th from './Table.sass'
import React, { Component, PropTypes as t } from 'react'

import Header from './Header'
import Body from './Body/Body'

export default class Table extends Component {
  static propTypes = {
    visibleFiltersDefinitions: t.arrayOf(t.object).isRequired,
    filter: t.shape({
      params: t.object.isRequired,
      sort: t.shape({
        filter: t.string.isRequired,
        asc: t.bool.isRequired
      }).isRequired
    }).isRequired,
    // columnsWidth: t.arrayOf(t.number).isRequired,
    // tableWidth: t.number.isRequired,
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
      <div className={th.table}>
        <table>
          <Header filters={filters} filter={filter}/>
          {/*{Body({games, filters, filter})}*/}
        </table>
      </div>
    )
  }
}
