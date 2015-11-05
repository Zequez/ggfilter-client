var { Component, PropTypes } = React
var DataTableFilters = require('./DataTableFilters')
var DataTableBatch = require('./DataTableBatch')
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTable extends Component {
  render() {
    console.log('Render <DataTable/>')


    var batches = []
    var gamesBatches = this.props.games.batches
    for(let i = 0; i < gamesBatches.length; ++i) {
      batches.push(
        <DataTableBatch key={i} games={gamesBatches[i]}/>
      )
    }

    return (
      <table className='table'>
        <DataTableFilters filters={this.props.filters} />
        {batches}
      </table>
    )
  }
}

DataTable.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  games: PropTypes.shape({
    list: React.PropTypes.array,
    fetching: React.PropTypes.bool,
    failed: React.PropTypes.bool
  }).isRequired
}

export default DataTable
