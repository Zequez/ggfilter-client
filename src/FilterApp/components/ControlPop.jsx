import th from './ControlPop.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'
import { elementOffsetTop, elementOffsetLeft, onClickOutsideOnce, bindGlobalKeyOnce } from 'shared/lib/utils'
import Portal from 'shared/components/Portal'
import Button from 'shared/components/Button'

// Should move this outside if I'm gonna use it here
import Control from './Control'

export default class ControlPop extends Component {
  static propTypes = {
    onClose: t.func.isRequired,
    target: t.object.isRequired // Dom node
  }

  state = {
    firstFrame: true,
    lastFrame: false,
    viewportAdjustLeft: 0,
    viewportAdjustTop: 0
  }

  componentDidMount () {
    this.refs.control.focus()
    onClickOutsideOnce(this.refs.pop, () => {
      this.initiateClosing()
    })
    bindGlobalKeyOnce(27, () => { // ESC
      this.initiateClosing()
    })


    this.setState({firstFrame: false, ...this.getViewportAdjust()})
  }

  getViewportAdjust () {
    const docWidth = document.documentElement.clientWidth
    const docHeight = document.documentElement.clientHeight
    const coords = this.refs.pop.getBoundingClientRect()

    let left = 0
    let top = 0
    if (coords.right > docWidth) {
      left = docWidth - coords.right
    } else if (coords.left < 56) { // 56 == Drawer size // HACK
      left = -coords.left + 56
    }

    if (coords.bottom > docHeight) {
      top = docHeight - coords.bottom
    } else if (coords.top < 0) {
      top = -coords.top
    }

    return { viewportAdjustLeft: left, viewportAdjustTop: top }
  }

  initiateClosing = () => {
    if (this.refs.pop) {
      this.setState({lastFrame: true})
      this.refs.pop.addEventListener('transitionend', () => {
        this.props.onClose()
      })
    } else {
      this.props.onClose()
    }
  }

  getOriginCenter = (target) => {
    const coords = target.getBoundingClientRect()

    return {
      top: Math.floor(
        elementOffsetTop(target) +
        coords.height / 2 +
        this.state.viewportAdjustTop),
      left: Math.floor(
        elementOffsetLeft(target) +
        coords.width / 2 +
        this.state.viewportAdjustLeft)
    }
  }

  render () {
    const { target, ...other } = this.props
    const { firstFrame, lastFrame } = this.state

    const style = this.getOriginCenter(target)

    const classNames = cx(th.ControlPop, {
      [th.ControlPop_firstFrame]: firstFrame,
      [th.ControlPop_lastFrame]: lastFrame
    })

    return (
      <Portal>
        <div className={classNames} style={style} ref='pop'>
          <div className={th.ControlPop__centerer}>
            <Control {...other} ref='control'/>
            <div className={th.ControlPop__actions}>
              <Button
                flat
                label='Done'
                onClick={this.initiateClosing}
                className={th.ControlList__ControlPop__closeButton}/>
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}
