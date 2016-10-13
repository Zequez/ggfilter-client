import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { setFilter } from 'src/FilterApp/filter'

import classNames from 'classnames'

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

  columnInputs (game, filter) {
    var columnInputs = {}
    for (let inputName in filter.columnInputs) {
      let columnName = filter.columnInputs[inputName]
      columnInputs[inputName] = game[columnName]
    }
    return columnInputs
  }

  hlClass (game, filter) {
    return game['hl_' + filter.name] ? 'hl' : ''
  }

  overflowColumnWrap (wrap, el) {
    if (!wrap) return el
    return <div className='overflow-cell'>{el}</div>
  }

  activeFilterParams (filter) {
    return filter.columnActive ? {
      setFilter: this.props.setFilter.bind(this, filter.name),
      filterParams: this.props.filtersParams[filter.name]
    } : {}
  }

  render () {
    console.logRender('DataTableBatch')

    var games = this.props.games
    var filters = this.props.filters

    var rows = []
    for (let i = 0; i < games.length; ++i) {
      let game = this.props.games[i]
      let cols = []
      for (let j = 0; j < filters.length; ++j) {
        let filter = filters[j]

        let tdClass = classNames({
          hl: game['hl_' + filter.name],
          [filter.name]: true,
          [filter.columnType]: true,
          'filter-column': true
        })

        cols.push(
          <td key={filter.name} className={tdClass}>
            {this.overflowColumnWrap(!filter.column.noOverflowContainer,
              <filter.column
                options={filter.columnOptions}
                name={filter.name}
                {...this.activeFilterParams(filter)}
                {...this.columnInputs(game, filter)}/>
            )}
          </td>
        )
      }

      rows.push(
        <tr key={game.id} className='game-row'>{cols}</tr>
      )
    }

    return (
      <tbody className='data-table-batch'>
        {rows}
      </tbody>
    )
  }
}
