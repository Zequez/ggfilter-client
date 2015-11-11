import { setQuerySort, adjustColumnWidth, clearColumnWidth } from 'stores/actions'
var Draggable = require('react-draggable')
var ColumnResizeHandle = require('components/ColumnResizeHandle')
var connect = require('react-redux').connect
var classNames = require('classnames')


class DataTableTitles extends React.Component {
  handleTitleClick(filterSort, ev) {
    this.props.dispatch(setQuerySort(filterSort))
  }
  //

  handleResizeDragStop(filterName, deltaX) {
    if (deltaX !== 0) {
      this.props.dispatch(adjustColumnWidth(filterName, deltaX))
    }
  }

  handleDoubleClick(filterName) {
    this.props.dispatch(clearColumnWidth(filterName))
  }

  render() {
    console.info('Render <DataTableTitles/>')
    let query = this.props.query

    let titles = this.props.filters.map((filter, i)=>{
      let sorted = query.sort == filter.name
      let titleClass = classNames({
        sort: sorted,
        'sort-asc': sorted && query.sort_asc,
        'sort-desc': sorted && !query.sort_asc,
        [filter.name]: true,
        'filter-title': true
      })
      let width = this.props.columnsWidth[i]

      return (
        <th key={filter.name}
          style={{width: width}}
          className={titleClass}
          onClick={this.handleTitleClick.bind(this, filter.sort)}>
          <div
            className='overflow-cell'>
            {filter.title}
          </div>
          <ColumnResizeHandle
            onStop={this.handleResizeDragStop.bind(this, filter.sort)}
            onDoubleClick={this.handleDoubleClick.bind(this, filter.sort)}/>
        </th>
      )

      /*
      <Draggable
        axis='x'
        ref='draggable'
        start={{x: 0, y: 0}}
        moveOnStartChange={true}
        onStop={this.handleResizeDragStop.bind(this, filter.name)}
        onStart={this.handleResizeDragStart.bind(this, filter.name)}>
        <div
          className='resize-handle'
          style={{transform: ''}}
          onDoubleClick={this.handleDoubleClick.bind(this, filter.name)}></div>
      </Draggable>
      */
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
  columnsWidth: t.arrayOf(t.number).isRequired,
  query: t.shape({
    sort: t.string.isRequired,
    sort_asc: t.bool.isRequired
  }).isRequired,
}

export default connect()(DataTableTitles)
