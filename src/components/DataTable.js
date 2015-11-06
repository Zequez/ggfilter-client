var { Component, PropTypes } = React
var DataTableFilters = require('./DataTableFilters')
var DataTableBatch = require('./DataTableBatch')

class DataTable extends Component {
  render() {
    console.info('Render <DataTable/>')

    var batches = []
    var gamesBatches = this.props.games.batches
    for(let i = 0; i < gamesBatches.length; ++i) {
      batches.push(
        <DataTableBatch key={i} games={gamesBatches[i]} filters={this.props.filters}/>
      )
    }

    return (
      <table className='data-table'>
        <DataTableFilters
          filters={this.props.filters}
          query={this.props.query} />
        {batches}
      </table>
    )
  }
}

DataTable.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.shape({
    filters: PropTypes.object,
    sort: PropTypes.string,
    sort_asc: PropTypes.bool,
    batchSize: PropTypes.number
  }).isRequired,
  games: PropTypes.shape({
    list: PropTypes.array,
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  }).isRequired
}

export default DataTable
