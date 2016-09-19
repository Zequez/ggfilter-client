import React, { PropTypes as t, Component } from 'react'
import { chunkSize, mousePosTo1 } from 'lib/FancyRangeFilterHelpers'

export default class FancyRangeFilterSensor extends Component {
  static propTypes = {
    chunkSize: t.number.isRequired,
    onHover: t.func.isRequired,
    onDrag: t.func.isRequired,
    onLeave: t.func.isRequired,
    onReset: t.func.isRequired
  }

  /**
   * The size of each range point, from 0 to 1
   */

  dragging = false
  pos = null
  start = null
  end = null

  shouldComponentUpdate () {
    return false
  }

  mousePosToChunkNumber (ev) {
    return Math.floor(mousePosTo1(ev, this.refs.bar) / this.props.chunkSize)
  }

  onMouseDown = (ev) => {
    if (ev.button !== 0) return // Return unless using the left mouse button
    let pos = this.mousePosToChunkNumber(ev)
    this.dragging = true
    this.start = this.end = pos
    this.propagateDrag(this.props.onDrag, true)
  }

  onMouseMove = (ev) => {
    this.pos = this.mousePosToChunkNumber(ev)

    if (this.dragging) {
      this.end = this.pos
      this.propagateDrag(this.props.onDrag, null)
    }

    this.props.onHover(this.pos)
  }

  onReset = (ev) => {
    ev.preventDefault()
    this.props.onReset()
  }

  onMouseLeave = (ev) => {
    this.props.onLeave()
    this.stopDragging()
  }

  stopDragging = (ev) => {
    if (this.dragging) {
      this.dragging = false
      this.propagateDrag(this.props.onDrag, false)
    }
  }

  propagateDrag (fun, status) {
    if (this.start <= this.end) {
      fun(this.start, this.end, status)
    } else {
      fun(this.end, this.start, status)
    }
  }

  render () {
    return (
      <div
        className='fancy-rf-sensor'
        ref='bar'
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.stopDragging}
        onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onReset}>
      </div>
    )
  }
}
