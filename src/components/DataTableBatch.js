var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTableBatch extends Component {
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

  render() {
    console.info('Render <DataTableBatch/>')

    var games = this.props.games
    var filters = this.props.filters

    var rows = []
    for(let i = 0; i < games.length; ++i) {
      let game = this.props.games[i]
      let cols = []
      for(let j = 0; j < filters.length; ++j) {
        let filter = filtersDefinitions[filters[j]]

        cols.push(
          <td key={filter.name} className={this.hlClass(game, filter)}>
            <filter.column {...this.columnInputs(game, filter)}/>
          </td>
        )
      }

      rows.push(
        <tr key={game.id}>{cols}</tr>
      )
    }

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
}

DataTableBatch.propTypes = {
  games: PropTypes.array.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DataTableBatch
