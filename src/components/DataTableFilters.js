var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTableFilters extends Component {
  render() {
    console.info('Render <DataTableFilters/>')

    var titles = []
    var controls = []
    var filters = this.props.filters
    for(let i = 0; i < filters.length; ++i) {
      let filter = filtersDefinitions[filters[i]]
      let query = this.props.queries[filters[i]] || {}

      titles.push(
        <th key={i}>{filter.title}</th>
      )

      controls.push(
        <th key={i}><filter.filter filter={filter} query={query}/></th>
      )
    }

    return (
      <thead>
        <tr>
          {titles}
        </tr>
        <tr>
          {controls}
        </tr>
      </thead>
    )
  }
}

DataTableFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  queries: PropTypes.object.isRequired
}

export default DataTableFilters
