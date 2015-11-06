class RangeFilter extends React.Component {
  handleChange(ev) {
    var gt = parseInt(this.refs.gt.value) || null
    var lt = parseInt(this.refs.lt.value) || null
    this.props.onChange( (gt || lt) ? {gt: gt, lt: lt} : null )
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.query.gt}
          ref='gt'
          onChange={this.handleChange.bind(this)} />
        <input
          type='text'
          value={this.props.query.lt}
          ref='lt'
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

var t = React.PropTypes
RangeFilter.propTypes = {
  query: t.shape({
    gt: t.number,
    lt: t.number
  }).isRequired,
  onChange: t.func.isRequired
}

export default RangeFilter
