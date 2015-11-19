var t = React.PropTypes

var debounce = require('lib/utils').debounce
var filtersDefinitions = require('sources/filtersDefinitions')
var TableWidthCalculator = require('lib/TableWidthCalculator')

var DataTableControls = require('components/DataTableControls')
var DataTableTitles   = require('components/DataTableTitles')
var DataTableBatch    = require('components/DataTableBatch')

class DataTable extends React.Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    query: t.shape({
      filters: t.object,
      sort: t.string,
      sort_asc: t.bool,
      batchSize: t.number
    }).isRequired,
    columnsWidth: t.object.isRequired,
    games: t.shape({
      list: t.array,
      fetching: t.bool,
      failed: t.bool
    }).isRequired,
    tags: t.arrayOf(t.string).isRequired
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(250, this.handleWindowResize.bind(this)))
  }

  handleWindowResize(ev) {
    this.forceUpdate()
  }

  render() {
    console.info('Render <DataTable/>')

    var filters = this.props.filters

    var batches = []
    var gamesBatches = this.props.games.batches
    for(let i = 0; i < gamesBatches.length; ++i) {
      batches.push(
        <DataTableBatch
          key={i}
          games={gamesBatches[i]}
          filters={filters}
          query={this.props.query}/>
      )
    }

    var docSize = document.documentElement.clientWidth
    var calc = new TableWidthCalculator(filters, this.props.columnsWidth, docSize)
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
            query={this.props.query}
            tags={this.props.tags}/>
        </thead>
        {batches}
      </table>
    )
  }
}

export default DataTable
