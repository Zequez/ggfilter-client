import {elementOffsetLeft} from 'lib/utils'
var t = React.PropTypes

export default class FancyRangeFilter2 extends React.Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.shape({
      template: t.string,
      range: t.arrayOf(t.number),
      rangeLabels: t.arrayOf(t.string),
      namedRanges: t.object,
      min: t.string,
      max: t.string
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  }

  state = {
    dragStart: null,
    start: null,
    end: null,
    mousePos: null,
    dragEndPos: null,
    movedAfterDragEnd: true
  }

  componentWillMount () {
    let options = this.props.options
    if (options.template === 'price') {
      options = {
        range: [0, 1, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, null],
        rangeLabels: ['Free', '$0.01', '$1', '$3', '$5', '$10', '$15', '$20', '$30', '$40', '$50', '$60', '∞'],
        namedRanges: {
          'Free': [0, 0],
          'Non-free': [1, null],
          'Any price': [0, null]
        },
        monoRanges: {
          0: [0, 0],
          1: [1, null],
          [null]: [1, null]
        }
      }
    }

    // We know this.props.options won't change
    let min = options.min || 'Min'
    let max = options.max || 'Max'

    this.monoRanges = options.monoRanges || {}
    this.namedRanges = options.namedRanges || {}
    this.range = options.range //[null, ...options.range, null]
    this.rangeLabels = options.rangeLabels // [min, ...options.rangeLabels, max]
    this.chunk = Math.floor(100 / this.range.length * 100) / 100

    this.setState({start: 0, end: this.range.length-1})
  }

  getPosIndex (ev) {
    let pxPos = ev.clientX - elementOffsetLeft(this.refs.bar)
    let pos = pxPos / this.refs.bar.clientWidth * 100
    return Math.floor(pos/this.chunk)
  }

  onMouseDown = (ev)=>{
    let pos = this.getPosIndex(ev)
    this.setState({start: pos, end: pos, dragStart: pos, mousePos: pos, dragEndPos: pos})
  }

  onMouseMove = (ev)=>{
    let pos = this.getPosIndex(ev)
    if (this.state.dragStart != null) {
      if (pos >= this.state.dragStart) {
        this.setState({start: this.state.dragStart, end: pos, dragEndPos: pos})
      }
      else {
        this.setState({start: pos, end: this.state.dragStart, dragEndPos: pos})
      }
    }
    else if (!this.state.movedAfterDragEnd && this.state.dragEndPos !== pos) {
      this.setState({movedAfterDragEnd: true})
    }
    this.setState({mousePos: pos})
  }

  onMouseLeave = (ev)=>{
    this.setState({mousePos: null})
    this.stopDragging(ev)
  }

  stopDragging = (ev)=>{
    if (this.state.dragStart != null) {
      let start = this.state.start
      let end = this.state.end

      let gt = this.range[start]
      let lt = this.range[end]

      if (gt === lt) {
        let newRange
        if ((newRange = this.monoRanges[gt])) {
          gt = newRange[0]
          lt = newRange[1]
          start = this.range.indexOf(gt)
          end = this.range.indexOf(lt)
        } else {
          start = 0
          end = this.range.length-1
          gt = this.range[start]
          lt = this.range[end]
        }
      }

      this.setState({dragStart: null, start: start, end: end, movedAfterDragEnd: false})


      // setTimeout(()=>{
      //   if (gt === null && lt === null) {
      //     this.props.onChange(null)
      //   }
      //   else {
      //     this.props.onChange({gt: gt, lt: lt})
      //   }
      // }, 100)

    }
  }

  label (start, end) {
    let gt = this.range[start]
    let lt = this.range[end]

    for (let name in this.namedRanges) {
      if (this.namedRanges[name][0] === gt && this.namedRanges[name][1] === lt) {
        return name
      }
    }

    let gtLabel = this.rangeLabels[start]
    let ltLabel = this.rangeLabels[end]

    if (gt !== null && lt === null) {
      return `≥${gtLabel}`
    } else if (gt === null && lt !== null) {
      return `≤${ltLabel}`
    } else if (gt === lt) {
      return gtLabel
    } else {
      return `[${gtLabel}, ${ltLabel}]`
    }
  }

  barStyle (start, end) {
    if (start == null || end == null) return {}
    let startX = start * this.chunk
    let endX = end * this.chunk + this.chunk
    return {
      left: `${startX}%`,
      right: `${100-endX}%`
    }
  }

  resolveStartEnd(start, end) {
    let monoRange
    if (start === end && (monoRange = this.monoRanges[this.range[start]])) {
      return [this.range.indexOf(monoRange[0]), this.range.indexOf(monoRange[1])]
    } else {
      return [start, end]
    }
  }

  render() {
    let start  = this.state.start
    let end    = this.state.end
    ;[start, end] = this.resolveStartEnd(start, end)
    let label  = this.label(start, end)
    let barStyle = this.barStyle(start, end)

    let mouseStart = this.state.mousePos
    let mouseEnd = mouseStart

    let showMouseLabel =
      mouseStart !== null
      && this.state.dragStart === null
      && this.state.movedAfterDragEnd

    let mouseLabel
    if (showMouseLabel) {
      ;[mouseStart, mouseEnd] = this.resolveStartEnd(mouseStart, mouseEnd)
      mouseLabel = this.label(mouseStart, mouseEnd)
    }

    let highlightStyle = this.barStyle(mouseStart, mouseEnd)
    if (!showMouseLabel) highlightStyle.display = 'none'

    return (
      <div
        className='fancy-rf'
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.stopDragging}
        onMouseLeave={this.onMouseLeave}
        ref='bar'
        >
        <div className='fancy-rf-bar' style={barStyle}></div>
        <div className='fancy-rf-highlight' style={highlightStyle}></div>
        <div className={'fancy-rf-label' + (showMouseLabel ? ' mouse-label' : '')}>
          <span>{showMouseLabel ? mouseLabel : label}</span>
        </div>
      </div>
    )
  }
}
