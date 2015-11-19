var t = React.PropTypes

export default class RangeFilter extends React.Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.shape({
      range: t.arrayOf(t.number)
    }),
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  }

  handleChange(ev) {
    var gt = this.refs.gt.value
    var lt = this.refs.lt.value
    if (gt || lt) {
      gt = gt ? parseInt(gt) : null
      lt = lt ? parseInt(lt) : null

      this.props.onChange({gt: gt, lt: lt})
    }
    else {
      this.props.onChange(null)
    }
  }

  selectOptions(ignoreUp = true) {
    var gt = this.props.query.gt
    var lt = this.props.query.lt
    var selectOptions = []
    var range = this.props.options.range
    var rangeLabels = this.props.options.rangeLabels
    for (let i = 0; i < range.length; ++i) {
      let v = range[i]
      var l = rangeLabels ? rangeLabels[i] : v

      if (ignoreUp) {
        var shouldDraw = lt==null || v < lt
        l = '≥' + l
      }
      else {
        var shouldDraw = gt==null || v > gt
        l = '≤' + l
      }

      if (shouldDraw) {
        selectOptions.push(
          <option key={i} value={v}>{l}</option>
        )
      }
    }
    return selectOptions
  }

  render() {
    return (
      <div>
        <select ref='gt' value={this.props.query.gt} onChange={this.handleChange.bind(this)}>
          <option value=''>Min</option>
          {this.selectOptions(true)}
        </select>
        <select ref='lt' value={this.props.query.lt} onChange={this.handleChange.bind(this)}>
          <option value=''>Max</option>
          {this.selectOptions(false)}
        </select>
      </div>
    )
  }
}
