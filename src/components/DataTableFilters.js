import { setQueryFilter, removeQueryFilter, setQuerySort } from 'stores/actions'
var connect = require('react-redux').connect
var filtersDefinitions = require('sources/filtersDefinitions')
var classNames = require('classnames')

class DataTableFilters extends React.Component {
  handleTitleClick(filterName, ev) {
    this.props.dispatch(setQuerySort(filterName))
  }

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
    var query = this.props.query
    var filters = this.props.filters
    for(let i = 0; i < filters.length; ++i) {
      let filter = filtersDefinitions[filters[i]]
      let queryFilter = query.filters[filters[i]] || {}

      var sorted = query.sort == filter.name
      var thClass = classNames({
        sort: sorted,
        'sort-asc': sorted && query.sort_asc,
        'sort-desc': sorted && !query.sort_asc
      })

      titles.push(
        <th key={i}
          onClick={this.handleTitleClick.bind(this, filter.name)}
          classNames={thClass}>
          {filter.title}
        </th>
      )

      controls.push(
        <th key={i}>
          <filter.filter
            query={queryFilter}
            options={filter.filterOptions}
            onChange={this.handleFilterChange.bind(this, filter.name)}/>
        </th>
      )
    }

    return (
      <thead className='data-table-filters'>
        <tr className='data-table-filters-titles'>
          {titles}
        </tr>
        <tr className='data-table-filters-controls'>
          {controls}
        </tr>
      </thead>
    )
  }
}

var t = React.PropTypes
DataTableFilters.propTypes = {
  filters: t.arrayOf(t.string).isRequired,
  query: t.object.isRequired,
}

export default connect()(DataTableFilters)
