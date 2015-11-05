var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTableBatch extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.games !== this.props.games || nextProps.filters !== this.props.filters
  }

  render() {
    console.info('Render <DataTableBatch/>')

    var rows = []
    var games = this.props.games
    var filters = this.props.filters
    for(let i = 0; i < games.length; ++i) {
      let game = this.props.games[i]
      let cols = []
      for(let j = 0; j < filters.length; ++j) {
        let filter = filtersDefinitions[filters[j]]
        cols.push(
          <td key={j}><filter.column name={filter.name} game={game}/></td>
        )
      }
      rows.push(
        <tr key={i}>{cols}</tr>
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
