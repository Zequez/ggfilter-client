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
    onResetResize: t.func.isRequired,
    active: t.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.iconize = false
    this.iconizedAt = 0
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    // Calculate if we need to iconize the title
    // if it's overflowing
    setTimeout(()=>{
      let overflowCell = this.refs.overflowCell
      let clientWidth = overflowCell.clientWidth
      let scrollWidth = overflowCell.scrollWidth

      let iconize = clientWidth !== scrollWidth

      if (iconize !== this.iconize) {
        if (iconize) {
          this.iconize = iconize
          this.iconizedAt = scrollWidth
          this.refs.th.className += ' iconized'
        }
        else if (clientWidth >= this.iconizedAt) {
          this.iconize = iconize
          this.refs.th.className = this.refs.th.className.replace('iconized', '')
        }

      }
    }, 50)
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
      'filter-title': true,
      'filter-title-active': this.props.active,
      iconized: this.iconized
    })
    let width = this.props.width

    return (
      <th style={{width: width}}
        ref='th'
        className={titleClass}
        title={'Sort by ' + filter.title}
        onClick={this.onSort.bind(this)}>
        <div
          className='overflow-cell'
          ref='overflowCell'>
          <i className={'fa icon-' + filter.name}></i>
          <span>{filter.title}</span>
        </div>
        <ColumnResizeHandle
          onStop={this.onResize.bind(this)}
          onDoubleClick={this.onResetResize.bind(this)}/>
      </th>
    )
  }
}
