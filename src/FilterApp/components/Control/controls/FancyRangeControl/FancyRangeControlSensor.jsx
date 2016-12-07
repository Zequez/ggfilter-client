import React, { PropTypes as t, Component } from 'react'
import { mousePosTo1 } from '../../../../lib/FancyRangeControlHelpers'

export default class FancyRangeControlSensor extends Component {
  static propTypes = {
    chunkSize: t.number.isRequired,
    onHover: t.func.isRequired,
    onDrag: t.func.isRequired,
    onLeave: t.func.isRequired,
    onReset: t.func.isRequired
  }

  inside = false
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

  setHoverPos (ev) {
    this.pos = this.mousePosToChunkNumber(ev)
  }

  onMouseDown = (ev) => {
    if (ev.button !== 0) return // Return unless using the left mouse button
    this.pos = this.mousePosToChunkNumber(ev)
    this.dragging = true
    this.start = this.end = this.pos
    this.props.onDrag(this.start, this.end, true)
  }

  onMouseMove = (ev) => {
    let newPos = this.mousePosToChunkNumber(ev)
    if (newPos !== this.pos || !this.inside) {
      this.inside = true
      this.pos = newPos

      if (this.dragging && this.end !== this.pos) {
        this.end = this.pos
        this.props.onDrag(this.start, this.end, null)
      }

      this.props.onHover(this.pos)
    }
  }

  onReset = (ev) => {
    ev.preventDefault()
    this.props.onReset()
  }

  onMouseLeave = (ev) => {
    this.inside = false
    this.props.onLeave()
    this.stopDragging()
  }

  stopDragging = (ev) => {
    if (this.dragging) {
      this.dragging = false
      this.props.onDrag(this.start, this.end, false)
    }
  }

  propagateDrag (fun, status) {
    fun(this.start, this.end, status)
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
