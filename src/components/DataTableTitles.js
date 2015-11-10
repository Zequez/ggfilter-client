import { setQuerySort } from 'stores/actions'
var connect = require('react-redux').connect
var classNames = require('classnames')

class DataTableTitles extends React.Component {
  handleTitleClick(filterSort, ev) {
    this.props.dispatch(setQuerySort(filterSort))
  }

  render() {
    console.info('Render <DataTableTitles/>')
    let query = this.props.query

    let titles = this.props.filters.map((filter)=>{
      let sorted = query.sort == filter.name
      let titleClass = classNames({
        sort: sorted,
        'sort-asc': sorted && query.sort_asc,
        'sort-desc': sorted && !query.sort_asc,
        [filter.name]: true,
        'filter-title': true
      })

      return (
        <th key={filter.name}
          onClick={this.handleTitleClick.bind(this, filter.sort)}
          style={{width: filter.width}}
          className={titleClass}>
          <div className='overflow-cell'>{filter.title}</div>
        </th>
      )
    })

    return (
      <tr className='data-table-titles'>
        {titles}
      </tr>
    )
  }
}

var t = React.PropTypes
DataTableTitles.propTypes = {
  filters: t.arrayOf(t.object).isRequired,
  query: t.shape({
    sort: t.string.isRequired,
    sort_asc: t.bool.isRequired
  }).isRequired,
}

export default connect()(DataTableTitles)
