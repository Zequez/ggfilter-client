var { Component, PropTypes } = React
var connect = require('react-redux').connect
import { setQueryFilter, removeQueryFilter } from 'stores/actions'
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTableFilters extends Component {
  handleFilterChange(filterName, data) {
    if (data) {
      data.filter = true
      data.highlight = false
      this.props.dispatch(setQueryFilter(filterName, data))
    }
    else {
      this.props.dispatch(removeQueryFilter(filterName))
    }
  }

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
        <th key={i}>
          <filter.filter
            query={query}
            onChange={this.handleFilterChange.bind(this, filter.name)}/>
        </th>
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

export default connect()(DataTableFilters)
