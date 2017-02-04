import th from './Table.sass'
import React, { Component, PropTypes as t } from 'react'

import Header from './Header'
import Body from './Body'

export default class Table extends Component {
  static propTypes = {
    columns: t.arrayOf(t.object).isRequired,
    columnsParams: t.object.isRequired,
    sorting: t.shape({
      column: t.string,
      direction: t.bool
    }).isRequired,
    gamesPages: t.arrayOf(t.array).isRequired
  }

  render () {
    console.logRender('DataTable')
    let { gamesPages, columns, columnsParams, sorting } = this.props

    return (
      <div className={th.Table}>
        <table className={th.Table__table}>
          <Header
            columns={columns}
            columnsParams={columnsParams}
            sorting={sorting}/>
          {Body({gamesPages, columns, columnsParams})}
        </table>
      </div>
    )
  }
}
