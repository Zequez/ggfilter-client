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
        <DataTableFilters
          filters={this.props.filters}
          queries={this.props.query.filters} />
        {batches}
      </table>
    )
  }
}

DataTable.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.shape({
    filters: PropTypes.arrayOf(PropTypes.object),
    sort: PropTypes.arrayOf(PropTypes.string),
    batchSize: PropTypes.number
  }).isRequired,
  games: PropTypes.shape({
    list: PropTypes.array,
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  }).isRequired
}

export default DataTable
