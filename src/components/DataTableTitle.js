var ColumnResizeHandle = require('components/ColumnResizeHandle')
var classNames = require('classnames')

var t = React.PropTypes
export default class DataTableTitle extends React.Component {
  static propTypes = {
    filter: t.object.isRequired,
    width: t.number.isRequired,
    sort: t.oneOf([true, false, null]),
    onSort: t.func.isRequired,
    onResize: t.func.isRequired,
    onResetResize: t.func.isRequired
  }

  onSort() {
    this.props.onSort(this.props.filter)
  }

  onResize(deltaX) {
    this.props.onResize(this.props.filter, deltaX)
  }

  onResetResize() {
    this.props.onResetResize(this.props.filter)
  }

  render() {
    let filter = this.props.filter
    let sort = this.props.sort
    let titleClass = classNames({
      sort: sort != null,
      'sort-asc': sort === true,
      'sort-desc': sort === false,
      [filter.name]: true,
      'filter-title': true
    })
    let width = this.props.width

    return (
      <th style={{width: width}}
        className={titleClass}
        onClick={this.onSort.bind(this)}>
        <div
          className='overflow-cell'>
          {filter.title}
        </div>
        <ColumnResizeHandle
          onStop={this.onResize.bind(this)}
          onDoubleClick={this.onResetResize.bind(this)}/>
      </th>
    )
  }
}
