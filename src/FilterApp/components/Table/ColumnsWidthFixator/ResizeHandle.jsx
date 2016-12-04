import th from '../Table.sass'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import { DraggableCore } from 'react-draggable'

export default class ResizeHandle extends Component {
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
    let className = cn(th.resizeHandle, {
      [th.resizeHandleDragging]: !!this.state.clientX
    })

    return (
      <DraggableCore
        onDrag={::this.onDrag}
        onStart={::this.onDragStart}
        onStop={::this.onDragStop}>
        <div
          className={className}
          style={style}
          onClick={::this.handleClick}
          onDoubleClick={this.props.onDoubleClick}></div>
      </DraggableCore>
    )
  }
}
