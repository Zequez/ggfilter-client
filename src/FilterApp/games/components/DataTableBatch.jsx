import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

const { setParam } = require('../../filter').actions

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
      np.games !== p.games ||
      np.filters !== p.filters ||
      np.filtersParams !== np.filtersParams
    )
  }

  render () {
    console.logRender('DataTableBatch')

    let { games, filters, filtersParams, setParam } = this.props

    return (
      <tbody className='data-table-batch'>
        {games.map((game) => (
          <tr key={game.id} className='game-row'>
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
