import th from './Table.sass'
import React, { Component, PropTypes as t } from 'react'

import Header from './Header'
import Body from './Body'

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
    gamesPages: t.arrayOf(t.array).isRequired
  }

  render () {
    console.logRender('DataTable')
    let { filter, gamesPages, visibleFiltersDefinitions: filters } = this.props

    return (
      <div className={th.Table}>
        <table className={th.Table__table}>
          <Header filters={filters} filter={filter}/>
          {Body({gamesPages, filters, filter})}
        </table>
      </div>
    )
  }
}
