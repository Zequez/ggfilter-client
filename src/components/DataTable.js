var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')
var TableWidthCalculator = require('lib/TableWidthCalculator')
var DataTableControls = require('./DataTableControls')
var DataTableTitles = require('./DataTableTitles')
var DataTableBatch = require('./DataTableBatch')

class DataTable extends Component {
  baseTableWidth(filters) {
    return this._baseTableWidth = this._baseTableWidth ||
    filters.reduce(function(width, filter){
      return width + filter.width
    }, 0)
  }

  tableWidth(filters) {
    return this.baseTableWidth(filters)
  }

  columnsWidths(baseTableWidth, filters) {

  }

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

    var calc = new TableWidthCalculator(filters, this.props.columnsWidth)
    var columnsWidth = calc.columnsWidth()
    var tableWidth = calc.tableWidth()


    return (
      <table className='data-table' style={{width: tableWidth}}>
        <thead>
          <DataTableTitles
            filters={filters}
            columnsWidth={columnsWidth}
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
  columnsWidth: PropTypes.object.isRequired,
  games: PropTypes.shape({
    list: PropTypes.array,
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  }).isRequired
}

export default DataTable
