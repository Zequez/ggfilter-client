var { Component, PropTypes } = React
var DataTableFilters = require('./DataTableFilters')
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTable extends Component {
  render() {
    console.log('Render <DataTable/>')

    var rows = []
    var games = this.props.games.list
    for(let i = 0; i < games.length; ++i){
      let game = games[i]
      rows.push(
        <tr key={i}>
          <td>{game.id}</td>
          <td>{game.name}</td>
        </tr>
      )
    }

    return (
      <table className='table'>
        <DataTableFilters filters={this.props.filters} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

DataTable.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  games: PropTypes.shape({
    list: React.PropTypes.array,
    fetching: React.PropTypes.bool,
    fetching: React.PropTypes.bool
  }).isRequired
}

export default DataTable
