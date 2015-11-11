var { Component, PropTypes } = React
var debounce = require('lib/utils').debounce
var filtersDefinitions = require('sources/filtersDefinitions')
var TableWidthCalculator = require('lib/TableWidthCalculator')
var DataTableControls = require('./DataTableControls')
var DataTableTitles = require('./DataTableTitles')
var DataTableBatch = require('./DataTableBatch')

class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {filters: []}
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(250, this.handleWindowResize.bind(this)))
    this.loadFilters()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filters !== nextProps.filters) {
      this.loadFilters(nextProps)
    }
  }

  loadFilters(filtersNames = this.props.filters) {
    this.setState({
      filters: filtersNames.map((f)=>filtersDefinitions[f])
    })
  }

  handleWindowResize(ev) {
    this.forceUpdate()
  }

  render() {
    console.info('Render <DataTable/>')

    var filters = this.state.filters

    var batches = []
    var gamesBatches = this.props.games.batches
    for(let i = 0; i < gamesBatches.length; ++i) {
      batches.push(
        <DataTableBatch key={i} games={gamesBatches[i]} filters={filters}/>
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
