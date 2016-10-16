import React, { Component, PropTypes as t } from 'react'
import { chunkSize } from '../../../lib/FancyRangeControlHelpers'
import FancyRangeControlMappedSensor from './FancyRangeControlMappedSensor'
import FancyRangeControlBar from './FancyRangeControlBar'
import FancyRangeControlLabel from './FancyRangeControlLabel'

export default class FancyRangeControl extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.object.isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  }

  state = {
    hoverPos: 0,
    hoverStart: 0,
    hoverEnd: 0,
    draggingStart: 0,
    draggingEnd: 0,
    start: 0,
    end: 0,
    dragging: false,
    hovering: false,
    justFinishedDragging: false
  }

  componentWillMount () {
    this.options = {
      range: [1, 2, 3, 4, 5],
      namedRanges: {},
      mappedRanges: {},
      autohook: undefined,
      strictlyRangeMode: true,
      label: {},
      ...this.props.options
    }

    this.chunkSize = chunkSize(this.options.range.length)
    this.readQuery()
  }

  componentWillReceiveProps (np) {
    this.readQuery(np.query)
  }

  readQuery (query = this.props.query) {
    let { range } = this.options
    let { gt, lt } = query

    let start = gt == null
      ? 0
      : range.indexOf(gt)
    let end = lt == null
      ? range.length - 1
      : range.indexOf(lt)

    this.setState({start, end})
  }

  triggerChange (start, end) {
    let { range } = this.options
    let gt = range[start]
    let lt = range[end]
    if (lt === Infinity) lt = null
    if (gt === null && lt === null || start === 0 && end === range.length - 1) {
      this.props.onChange(null)
    } else {
      this.props.onChange({gt, lt})
    }
  }

  onSensorHover = (hoverStart, hoverEnd, hoverPos) => {
    this.setState({hoverStart, hoverEnd, hoverPos, hovering: true, justFinishedDragging: false})
  }

  onSensorLeave = () => {
    this.setState({hovering: false})
  }

  onSensorDrag = (start, end, status) => {
    this.setState({draggingStart: start, draggingEnd: end})

    if (status !== null) this.setState({dragging: status})
    if (status === false) {
      this.setState({start, end, justFinishedDragging: true})
      this.triggerChange(start, end)
    }
  }

  onSensorReset = () => {
    this.props.onChange(null)
  }

  render () {
    let {
      dragging,
      hovering,
      draggingStart,
      draggingEnd,
      start,
      end,
      hoverStart,
      hoverEnd,
      hoverPos,
      justFinishedDragging } = this.state

    let showCaret = hovering
    let showHighlight = hovering && !justFinishedDragging

    return (
      <div className='fancy-rf'>
        <FancyRangeControlMappedSensor
          range={this.options.range}
          mappedRanges={this.options.mappedRanges}
          autohook={this.options.autohook}
          multiMode={this.options.strictlyRangeMode}
          onHover={this.onSensorHover}
          onLeave={this.onSensorLeave}
          onDrag={this.onSensorDrag}
          onReset={this.onSensorReset}/>
        <FancyRangeControlBar
          className='fancy-rf-bar-main'
          chunkSize={this.chunkSize}
          start={start}
          end={end}/>
        {showCaret ? (
          <FancyRangeControlBar
            className='fancy-rf-bar-caret'
            chunkSize={this.chunkSize}
            start={hoverPos}
            end={hoverPos}/>
        ) : null}
        {showHighlight ? (
          <FancyRangeControlBar
            className='fancy-rf-bar-highlight'
            chunkSize={this.chunkSize}
            start={dragging ? draggingStart : hoverStart}
            end={dragging ? draggingEnd : hoverEnd}/>
        ) : null}
        <FancyRangeControlLabel
          start={showHighlight ? (dragging ? draggingStart : hoverStart) : start}
          end={showHighlight ? (dragging ? draggingEnd : hoverEnd) : end}
          range={this.options.range}
          options={this.options.label}
          className={showHighlight ? 'mouse-label' : ''}/>
      </div>
    )
  }
}
