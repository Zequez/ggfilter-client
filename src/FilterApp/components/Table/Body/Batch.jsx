import th from './Body.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

const { setParam } = require('../../../filter').actions

import ColumnComponent from './ColumnComponent'

@connect((s) => ({}), {
  setParam
})
export default class DataTableBatch extends Component {
  static propTypes = {
    games: t.array.isRequired,
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object,

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

    let { games, filters, filtersParams, setParam } = this.props

    return (
      <tbody className={th.Body__Batch}>
        {games.map((game) => (
          <tr key={game.id} className={th.Body__Row}>
            {filters.map((filter) => (
              <ColumnComponent
                key={filter.name}
                game={game}
                filter={filter}
                setFilter={setParam}
                filterParams={filtersParams[filter.name]}/>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}
