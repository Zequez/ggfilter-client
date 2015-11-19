var connect = require('react-redux').connect
var classNames = require('classnames')

class DataTableBatch extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.games !== this.props.games || nextProps.filters !== this.props.filters
  }

  columnInputs(game, filter) {
    var columnInputs = {}
    for(let inputName in filter.columnInputs) {
      let columnName = filter.columnInputs[inputName]
      columnInputs[inputName] = game[columnName]
    }
    return columnInputs
  }

  hlClass(game, filter) {
    return game['hl_' + filter.name] ? 'hl' : ''
  }

  overflowColumnWrap(wrap, el) {
    if (!wrap) return el
    return <div className='overflow-cell'>{el}</div>
  }

  render() {
    console.info('Render <DataTableBatch/>')

    var games = this.props.games
    var filters = this.props.filters

    var rows = []
    for(let i = 0; i < games.length; ++i) {
      let game = this.props.games[i]
      let cols = []
      for(let j = 0; j < filters.length; ++j) {
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
                dispatch={this.props.dispatch}
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

var t = React.PropTypes
DataTableBatch.propTypes = {
  games: t.array.isRequired,
  filters: t.arrayOf(t.object).isRequired
}

export default connect()(DataTableBatch)
