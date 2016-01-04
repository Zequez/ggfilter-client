import {elementOffsetLeft} from 'lib/utils'
var t = React.PropTypes

export default class FancyRangeFilter extends React.Component {
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
      nullOnFullRange: t.bool,
      nullifyExtremes: t.bool
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
    dragEndPos: null
  }

  defaultOptions = {
    range: [1, 2, 3, 4, 5],
    rangeLabels: null,
    nullifyStart: true,
    nullifyEnd: true,
    fallbackRange: null, // [first, last]
    fallbackRangeTo: 'all', // 'left' || 'right' || 'all' || 'no'
    projectFallbackMap: false,
    labelInterpolation: '%s',
    gtInterpolation: '≥%s',
    ltInterpolation: '≤%s',
    rangeInterpolation: '[%s, %s]',
    fullRangeName: 'Any',
    namedRanges: {}, // eg: {'Free': [0, 0]}
    mappedRanges: [
      // eg: [[1, 1], [1, 1]] // Prevents it from mapping to 1-5
      // eg: [[5, 5],   [1, 5]] // Maps a single 5 to 1-5
      // eg: [[1, 2], [1, 1]] // Maps to 1 if selecting the range 1-2
    ]
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    let s = this.state
    return np.query     !== p.query
        || ns.start     !== s.start
        || ns.end       !== s.end
        || ns.mousePos  !== s.mousePos
        || ns.dragStart !== s.dragStart
  }

  componentWillMount () {
    // We know this.props.options won't change
    // so we can handle them on componentWillMount

    // Extend default options
    let options = {}
    let givenOptions = this.props.options
    let defaultOptions = this.defaultOptions
    for (let opt in defaultOptions) {
      options[opt] = givenOptions[opt] == null ? defaultOptions[opt] : givenOptions[opt]
    }

    this.options = options // = this.optionsTemplates.price // temporal for testing

    this.range        = options.range
    this.rangeLabels  = options.rangeLabels || options.range.map(r => r == null ? '∞' : options.labelInterpolation.replace('%s', r))
    this.last         = this.range.length-1
    this.chunk        = Math.floor(100 / this.range.length * 100) / 100

    this.indexMappedRanges = []
    for (let mappedRange of options.mappedRanges) {
      this.indexMappedRanges.push([
        this.valueRange2IndexRange(mappedRange[0]),
        this.valueRange2IndexRange(mappedRange[1])
      ])
    }

    this.indexNamedRanges = {}
    for (let name in options.namedRanges) {
      this.indexNamedRanges[name] = this.valueRange2IndexRange(options.namedRanges[name])
    }
    if (options.fullRangeName) this.indexNamedRanges[options.fullRangeName] = [0, this.last]

    this.indexFallbackRange = this.options.fallbackRange
      ? this.valueRange2IndexRange(this.options.fallbackRange)
      : [0, this.last]

    this.readQuery()
  }

  componentWillReceiveProps (np) {
    this.readQuery(np.query)
  }

  valueRange2IndexRange (valueRange) {
    return [this.range.indexOf(valueRange[0]), this.range.indexOf(valueRange[1])]
  }

  resolveRange (start, end, resolveFallback = false) {
    let rangeMap = this.indexMappedRanges.find(mp => mp[0][0] === start && mp[0][1] === end)
    if (!rangeMap && start === end && (this.options.projectFallbackMap || resolveFallback)) {
      switch (this.options.fallbackRangeTo) {
        case 'no': break
        case 'all': return [0, this.last]
        case 'left': return end !== 0 ? [0, end] : [0, this.last]
        case 'right': return start !== this.last ? [start, this.last] : [0, this.last]
      }
    }
    return rangeMap ? rangeMap[1] : [start, end]
  }

  readQuery (query = this.props.query) {
    let start = 0
    let end = this.last
    if (query.gt != null) start = this.range.indexOf(query.gt)
    if (query.lt != null) end = this.range.indexOf(query.lt)
    this.setState({start: start, end: end})
  }

  getPosIndex (ev) {
    let pxPos = ev.clientX - elementOffsetLeft(this.refs.bar)
    let pos = pxPos / this.refs.bar.clientWidth * 100
    return Math.floor(pos/this.chunk)
  }

  onMouseDown = (ev)=>{
    if (ev.button !== 0) return
    let pos = this.getPosIndex(ev)
    this.setState({start: pos, end: pos, dragStart: pos, mousePos: pos, dragEndPos: pos})
  }

  onMouseMove = (ev)=>{
    let pos = this.getPosIndex(ev)
    if (this.state.dragStart != null) {
      if (pos >= this.state.dragStart) {
        this.setState({start: this.state.dragStart, end: pos, dragEndPos: pos})
      } else {
        this.setState({start: pos, end: this.state.dragStart, dragEndPos: pos})
      }
    }
    this.setState({mousePos: pos})
  }

  onMouseLeave = (ev)=>{
    this.setState({mousePos: null})
    this.stopDragging(ev)
  }

  stopDragging = (ev)=>{
    if (this.state.dragStart !== null) {
      let start = this.state.start
      let end = this.state.end

      ;[start, end] = this.resolveRange(start, end, true)

      this.setState({dragStart: null, start: start, end: end})

      let gt = this.range[start]
      let lt = this.range[end]

      // Nullify start and end only if we are selecting a range that
      // starts or ends on them. If we are selecting a single value
      // then we don't want to nullify them.
      if (start !== end) {
        if (this.options.nullifyStart && start === 0 && end !== 0) {
          gt = null
        }

        if (this.options.nullifyEnd && end === this.last && start !== this.last) {
          lt = null
        }
      }

      setTimeout(()=>{
        if (gt === null && lt === null) {
          this.props.onChange(null)
        } else {
          this.props.onChange({gt: gt, lt: lt})
        }
      }, 100)
    }
  }

  onRightClick = (ev)=>{
    ev.preventDefault()
    this.setState({start: 0, end: this.last})
    setTimeout(()=>{
      this.props.onChange(null)
    }, 100)
  }

  label (start, end) {
    // Get specific label of named range
    let namedRanges = this.indexNamedRanges
    for (let name in namedRanges) {
      if (namedRanges[name][0] === start && namedRanges[name][1] === end) {
        return name
      }
    }

    let gtLabel = this.rangeLabels[start]
    let ltLabel = this.rangeLabels[end]

    if (start === end) {
      return gtLabel
    } else if (start === 0 && end !== this.last) {
      return this.options.ltInterpolation.replace('%s', ltLabel)
    } else if (end === this.last && start !== 0) {
      return this.options.gtInterpolation.replace('%s', gtLabel)
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

  render() {
    let start  = this.state.start
    let end    = this.state.end
    ;[start, end] = this.resolveRange(start, end)
    let label  = this.label(start, end)
    let barStyle = this.barStyle(start, end)

    let mouseStart = this.state.mousePos
    let mouseEnd = mouseStart

    let showMouseLabel =
      mouseStart !== null
      && this.state.dragStart === null

    let mouseLabel
    if (showMouseLabel) {
      ;[mouseStart, mouseEnd] = this.resolveRange(mouseStart, mouseEnd)
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
        onContextMenu={this.onRightClick}
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
