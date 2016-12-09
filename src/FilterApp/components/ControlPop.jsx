import th from './ControlPop.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'
import { elementOffsetTop, elementOffsetLeft, onClickOutsideOnce, bindGlobalKeyOnce } from 'shared/lib/utils'
import Portal from 'shared/components/Portal'
import Button from 'shared/components/Button'
import Icon from 'shared/components/Icon'

// Should move this outside if I'm gonna use it here
import Control from './Control'

export default class ControlPop extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    query: t.oneOfType([t.object, t.bool]).isRequired,
    onChange: t.func,
    onClose: t.func.isRequired,
    target: t.object.isRequired // Dom node
  }

  state = {
    viewportAdjustLeft: 0,
    viewportAdjustTop: 0,

    frameClass: th.ControlPop_probeFrame
  }

  portalDidMount = () => {
    this.refs.control.focus()
    onClickOutsideOnce(this.refs.pop, () => {
      this.leaveFrame()
    })
    bindGlobalKeyOnce(27, () => { // ESC
      this.leaveFrame()
    })

    this.setState({
      frameClass: th.ControlPop_enterFrame,
      ...this.getViewportAdjust()
    })
  }

  portalDidUpdate = () => {
    if (this.state.frameClass === th.ControlPop_enterFrame) {
      // Force repaint otherwise the transition won't run
      this.refs.pop.getBoundingClientRect()
      this.setState({frameClass: null})
    }
  }

  leaveFrame = () => {
    if (this.refs.pop) {
      this.setState({frameClass: th.ControlPop_leaveFrame})
      this.refs.pop.addEventListener('transitionend', () => {
        this.props.onClose()
      })
    } else {
      this.props.onClose()
    }
  }

  getViewportAdjust () {
    const docWidth = document.documentElement.clientWidth
    const docHeight = document.documentElement.clientHeight
    const coords = this.refs.pop.getBoundingClientRect()

    let left = 0
    let top = 0
    if (coords.right > docWidth) {
      left = docWidth - coords.right
    } else if (coords.left < 0) {
      left = -coords.left
    }

    if (coords.bottom > docHeight) {
      top = docHeight - coords.bottom
    } else if (coords.top < 0) {
      top = -coords.top
    }

    return { viewportAdjustLeft: left, viewportAdjustTop: top }
  }

  targetInitialCenter = null
  getTargetInitialCenter () {
    if (this.targetInitialCenter) return this.targetInitialCenter

    const target = this.props.target
    const coords = target.getBoundingClientRect()
    return this.targetInitialCenter = {
      top: Math.floor(
        elementOffsetTop(target) +
        coords.height / 2),
      left: Math.floor(
        elementOffsetLeft(target) +
        coords.width / 2)
    }
  }

  getAdjustedCenter = () => {
    const targetCenter = this.getTargetInitialCenter()

    return {
      top: Math.floor(targetCenter.top + this.state.viewportAdjustTop),
      left: Math.floor(targetCenter.left + this.state.viewportAdjustLeft)
    }
  }

  onClear = () => {
    this.props.onChange(true)
    this.props.onClose()
  }

  render () {
    const { target, filter, query, ...other } = this.props //eslint-disable-line no-unused-vars
    const { frameClass } = this.state

    const style = this.getAdjustedCenter()
    const classNames = cx(th.ControlPop, frameClass)

    return (
      <Portal onMount={this.portalDidMount} onUpdate={this.portalDidUpdate}>
        <div className={classNames} style={style} ref='rsa'>
          <div className={th.ControlPop__centered} ref='pop'>
            <div className={th.ControlPop__header}>
              <Icon icon={'filter-' + filter.name}/>
              <span className={th.ControlPop__title}>{filter.title}</span>
            </div>
            <div className={th.ControlPop__body}>
              <Control {...other} filter={filter} query={query} ref='control'/>
            </div>
            <div className={th.ControlPop__actions}>
              <Button flat disabled={query === true} label='Clear' onClick={this.onClear}/>
              <Button
                flat
                label='Done'
                onClick={this.leaveFrame}
                className={th.ControlList__ControlPop__closeButton}/>
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}
