import {elementOffsetLeft} from 'lib/utils'
var t = React.PropTypes

export default class FancyRangeFilter extends React.Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.shape({
      range: t.arrayOf(t.number).isRequired,
      rangeLabels: t.arrayOf(t.string)
    }).isRequired,
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

  state = {
    dragStart: null,
    start: null,
    end: null
  }

  getPos(ev, round = 10) {
    let pxPos = ev.clientX - elementOffsetLeft(this.refs.bar)
    let pos = Math.floor(pxPos / this.refs.bar.clientWidth * 100 * 10) / 10
    return this.roundToRanges(pos)
    return Math.round(pos / round) * round
  }

  roundToRanges(pos) {
    let len = this.props.options.range.length
    let chunk = 100/(len+1)
    let diff = pos % chunk
    let roundedPos = diff > chunk/2 ? pos+(chunk-diff) : pos-diff
    return Math.floor(roundedPos*10)/10
  }

  onMouseDown = (ev)=>{
    let pos = this.getPos(ev)
    this.setState({start: pos, end: pos, dragStart: pos})
  }

  onMouseMove = (ev)=>{
    if (this.state.dragStart != null) {
      let pos = this.getPos(ev)
      if (pos > this.state.dragStart) {
        this.setState({start: this.state.dragStart, end: pos})
      }
      else {
        this.setState({start: pos, end: this.state.dragStart})
      }
    }
  }

  stopDragging = (ev)=>{
    if (this.state.dragStart != null) {
      let start = this.state.start
      let end = this.state.end

      if (start === end) {
        start = null
        end = null
      }

      this.setState({dragStart: null, start: start, end: end})

      if (start || end) {
        let range = this.props.options.range
        let gti = this.valueIndexFromPos(start)
        let lti = this.valueIndexFromPos(end)
        let gt = gti==null ? null : range[gti]
        let lt = lti==null ? null : range[lti]

        this.props.onChange({gt: gt, lt: lt})
      }
      else {
        this.props.onChange(null)
      }
    }
  }

  valueIndexFromPos(pos) {
    if (!pos || pos === 0 || pos === 100) {
      return null
    }
    else {
      let len = this.props.options.range.length
      let chunk = 100/(len+1)
      return Math.round(pos/chunk-1)
    }
  }

  onClick = (ev)=>{

  }

  labelStyle(start, end, left = true) {
    let centerSize = end - start
    let sideSize = left ? start : 100-end
    let sideIsLarger = sideSize > centerSize/2
    let pos = left ? start : end

    if (left) {
      if (sideIsLarger) {
        return { right: `${100-pos}%`, color: 'inherit' }
      }
      else {
        return { left: `${pos}%` }
      }
    }
    else {
      if (sideIsLarger) {
        return { left: `${pos}%`, color: 'inherit' }
      }
      else {
        return { right: `${100-pos}%` }
      }
    }
  }

  render() {
    let rangeLabels = this.props.options.rangeLabels || this.props.options.range

    let start = this.state.start
    let end = this.state.end
    if (start == null) start = 0
    if (end == null) end = 100

    let gti = this.valueIndexFromPos(this.state.start)
    let labelLeft = rangeLabels[gti] || 'Min'
    let lti = this.valueIndexFromPos(this.state.end)
    let labelRight = rangeLabels[lti] || 'Max'

    var barStyle = {
      left: `${start}%`,
      right: `${100-end}%`
    }

    let labelLeftStyle = this.labelStyle(start, end, true)
    let labelRightStyle = this.labelStyle(start, end, false)

    return (
      <div
        className='fancy-rf'
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.stopDragging}
        onMouseLeave={this.stopDragging}
        onClick={this.onClick}
        ref='bar'
        >
        <div className='fancy-rf-bar' style={barStyle}></div>
        <span className='fancy-rf-label-left' style={labelLeftStyle}>
          {labelLeft}
        </span>
        <span className='fancy-rf-label-right' style={labelRightStyle}>
          {labelRight}
        </span>
      </div>
    )
  }
}
