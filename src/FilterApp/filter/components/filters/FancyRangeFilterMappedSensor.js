import React, { PropTypes as t, Component } from 'react'
import FancyRangeFilterSensor from './FancyRangeFilterSensor'
import { chunkSize, mapRange } from '../../lib/FancyRangeFilterHelpers'

export default class FancyRangeFilterMappedSensor extends Component {
  static propTypes = {
    range: t.array.isRequired,
    mappedRanges: t.object.isRequired,
    autohook: t.any,
    multiMode: t.bool,
    onHover: t.func.isRequired,
    onDrag: t.func.isRequired,
    onLeave: t.func.isRequired,
    onReset: t.func.isRequired
  }

  dragStart = null
  dragEnd = null
  hoverStart = null
  hoverEnd = null

  componentWillMount () {
    this.chunkCount = this.props.range.length
    this.chunkSize = chunkSize(this.chunkCount)
  }

  shouldComponentUpdate () {
    return false
  }

  setHoverPos (pos) {
    let { range, mappedRanges, autohook, multiMode } = this.props
    ;[this.hoverStart, this.hoverEnd] = mapRange(pos, pos, range, mappedRanges, autohook, multiMode)
  }

  setDragPos (chunkStart, chunkEnd) {
    let { range, mappedRanges, multiMode } = this.props
    if (chunkStart > chunkEnd) {
      [chunkStart, chunkEnd] = [chunkEnd, chunkStart]
    }
    ;[this.dragStart, this.dragEnd] = mapRange(chunkStart, chunkEnd, range, mappedRanges, undefined, multiMode)
  }

  onHover = (pos) => {
    this.setHoverPos(pos, pos)
    this.props.onHover(this.hoverStart, this.hoverEnd, pos)
  }

  onDrag = (chunkStart, chunkEnd, status) => {
    if (status === true) {
      // When clicking, send the previously projected range
      this.dragStart = this.hoverStart
      this.dragEnd = this.hoverEnd
      this.props.onDrag(this.hoverStart, this.hoverEnd, status)
    } else if (status === null) {
      // Once we start dragging, send the mapped range but without autohook
      this.setDragPos(chunkStart, chunkEnd)
      this.props.onDrag(this.dragStart, this.dragEnd, status)
    } else {
      // When we finish dragging, finally send the current drag
      this.props.onDrag(this.dragStart, this.dragEnd, status)
    }
  }

  render () {
    return (
      <FancyRangeFilterSensor
        chunkSize={this.chunkSize}
        onHover={this.onHover}
        onDrag={this.onDrag}
        onLeave={this.props.onLeave}
        onReset={this.props.onReset}/>
    )
  }
}
