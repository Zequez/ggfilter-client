import th from './Body.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

const { setParam } = require('../../../filter').actions

import ColumnComponent from './ColumnComponent'

@connect((s) => ({}), {
  setParam
})
export default class Batch extends Component {
  static propTypes = {
    games: t.array.isRequired,
    columns: t.arrayOf(t.object).isRequired,
    columnsParams: t.object,

    setParam: t.func.isRequired
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.games !== p.games
    )
  }

  render () {
    console.logRender('DataTableBatch')

    let { games, columns, columnsParams, setParam } = this.props

    return (
      <tbody className={th.Body__Batch}>
        {games.map((game) => (
          <tr key={game.id} className={th.Body__Row}>
            {columns.map((column) => (
              <ColumnComponent
                key={column.name}
                game={game}
                column={column}
                setParam={setParam}
                columnParams={columnsParams[column.name]}/>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}
