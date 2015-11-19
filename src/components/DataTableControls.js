import { setQueryFilter, removeQueryFilter } from 'stores/actions'
var connect = require('react-redux').connect
var classNames = require('classnames')

class DataTableControls extends React.Component {
  handleFilterChange(filterName, data) {
    if (data) {
      // data.highlight = false
      this.props.dispatch(setQueryFilter(filterName, data))
    }
    else {
      this.props.dispatch(removeQueryFilter(filterName))
    }
  }

  render() {
    console.info('Render <DataTableControls/>')

    let query = this.props.query
    var filters = this.props.filters
    let controls = this.props.filters.map((filter)=>{
      let queryFilter = query.filters[filter.name]

      let controlClass = classNames({
        [filter.name]: true,
        'filter-control': true,
        [filter.filterType]: true
      })

      let filterProps = {
        query: queryFilter,
        name: filter.name,
        options: filter.filterOptions,
        onChange: this.handleFilterChange.bind(this, filter.name)
      }

      // I'm pretty sure this is a terrible idea
      if (filter.name === 'tags') filterProps.options.tags = this.props.tags

      return (
        <th key={filter.name} className={controlClass}>
          <filter.filter {...filterProps}/>
        </th>
      )
    })

    return (
      <tr className='data-table-controls'>
        {controls}
      </tr>
    )
  }
}

var t = React.PropTypes
DataTableControls.propTypes = {
  filters: t.arrayOf(t.object).isRequired,
  query: t.object.isRequired,
  tags: t.arrayOf(t.string).isRequired
}

export default connect()(DataTableControls)
