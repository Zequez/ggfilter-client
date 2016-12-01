import React, { PropTypes as t } from 'react'
import { DraggableCore } from 'react-draggable'

export default class ResizeHandle extends DraggableCore {
  static propTypes = {
    onStop: t.func.isRequired,
    onDoubleClick: t.func.isRequired
  }

  startX = 0
  state = {
    clientX: 0
  }

  onDrag (ev, cEv) {
    this.setState({clientX: this.state.clientX + cEv.deltaX})
  }

  onDragStart (ev, cEv) {
    this.startX = cEv.x
  }

  onDragStop (ev, cEv) {
    this.props.onStop(cEv.x - this.startX)
    this.setState({clientX: 0})
  }

  handleClick (ev) {
    ev.stopPropagation()
  }

  render () {
    let style = {transform: `translateX(${this.state.clientX}px)`}

    return (
      <DraggableCore
        onDrag={::this.onDrag}
        onStart={::this.onDragStart}
        onStop={::this.onDragStop}>
        <div
          className='resize-handle'
          style={style}
          onClick={::this.handleClick}
          onDoubleClick={this.props.onDoubleClick}></div>
      </DraggableCore>
    )
  }
}
