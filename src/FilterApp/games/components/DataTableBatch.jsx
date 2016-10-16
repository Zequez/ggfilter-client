import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { setFilter } from 'src/FilterApp/filter'

import ColumnComponent from './ColumnComponent'

@connect((s) => ({}), {
  setFilter
})
export default class DataTableBatch extends Component {
  static propTypes = {
    games: t.array.isRequired,
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object
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

    let { games, filters, filtersParams, setFilter } = this.props

    return (
      <tbody className='data-table-batch'>
        {games.map((game) => (
          <tr key={game.id} className='game-row'>
            {filters.map((filter) => (
              <ColumnComponent
                key={filter.name}
                game={game}
                filter={filter}
                setFilter={setFilter}
                filterParams={filtersParams[filter.name]}/>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}
