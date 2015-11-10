var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')
var DataTableControls = require('./DataTableControls')
var DataTableTitles = require('./DataTableTitles')
var DataTableBatch = require('./DataTableBatch')

class DataTable extends Component {
  render() {
    console.info('Render <DataTable/>')

    var filters = this.props.filters.map((f)=>filtersDefinitions[f])

    var batches = []
    var gamesBatches = this.props.games.batches
    for(let i = 0; i < gamesBatches.length; ++i) {
      batches.push(
        <DataTableBatch key={i} games={gamesBatches[i]} filters={filters}/>
      )
    }

    return (
      <table className='data-table'>
        <thead>
          <DataTableTitles
            filters={filters}
            query={this.props.query}/>
          <DataTableControls
            filters={filters}
            query={this.props.query} />
        </thead>
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
