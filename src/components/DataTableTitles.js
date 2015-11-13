import { setQuerySort, adjustColumnWidth, clearColumnWidth } from 'stores/actions'
var DataTableTitle = require('components/DataTableTitle')
var connect = require('react-redux').connect
var t = React.PropTypes

class DataTableTitles extends React.Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    columnsWidth: t.arrayOf(t.number).isRequired,
    query: t.shape({
      filters: t.object.isRequired,
      sort: t.string.isRequired,
      sort_asc: t.bool.isRequired
    }).isRequired,
  }

  onSort(filter, ev) {
    this.props.dispatch(setQuerySort(filter.sort))
  }

  onResize(filter, deltaX) {
    if (deltaX !== 0) {
      this.props.dispatch(adjustColumnWidth(filter.name, deltaX))
    }
  }

  onResetResize(filter) {
    this.props.dispatch(clearColumnWidth(filter.name))
  }

  render() {
    console.info('Render <DataTableTitles/>')
    let query = this.props.query

    let titles = this.props.filters.map((filter, i)=>{
      let sort = (query.sort == filter.name) ? query.sort_asc : null
      let width = this.props.columnsWidth[i]

      return (
        <DataTableTitle
          key={filter.name}
          filter={filter}
          width={width}
          sort={sort}
          active={!!this.props.query.filters[filter.name]}
          onSort={this.onSort.bind(this)}
          onResize={this.onResize.bind(this)}
          onResetResize={this.onResetResize.bind(this)}/>
      )
    })

    return (
      <tr className='data-table-titles'>
        {titles}
      </tr>
    )
  }
}

export default connect()(DataTableTitles)
