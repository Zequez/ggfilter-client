import React, { PropTypes as t } from 'react'

var DraggableCore = require('react-draggable').DraggableCore
// var DraggableCore = require('react-draggable').CReateTRans
// import {DraggableCore} from 'react-draggable'

export default class ColumnResizeHandle extends DraggableCore {
  constructor(props) {
    super(props)
    this.state.clientX = 0
  }

  static propTypes = {
    onStop: t.func.isRequired,
    onDoubleClick: t.func.isRequired
  }

  onDrag(ev, cEv) {
    this.setState({clientX: this.state.clientX + cEv.position.deltaX})
  }

  onDragStart(ev, cEv) {
    this.startX = cEv.position.clientX
  }

  onDragStop(ev, cEv) {
    this.props.onStop(cEv.position.clientX - this.startX)
    this.setState({clientX: 0})
  }

  handleClick(ev) {
    ev.stopPropagation()
  }

  render() {
    let style = {transform: `translateX(${this.state.clientX}px)`}

    return (
      <DraggableCore
        onDrag={this.onDrag.bind(this)}
        onStart={this.onDragStart.bind(this)}
        onStop={this.onDragStop.bind(this)}>
        <div
          className='resize-handle'
          style={style}
          onClick={this.handleClick.bind(this)}
          onDoubleClick={this.props.onDoubleClick}></div>
      </DraggableCore>
    )
  }
}
