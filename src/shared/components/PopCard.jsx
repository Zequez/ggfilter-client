import th from './PopCard.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { onClickOutsideOnce, bindGlobalKeyOnce } from 'shared/lib/utils'
import Portal from './Portal'

const STATE_MEASURE = 1
const STATE_FIT = 2
const STATE_ENTER = 3
const STATE_VISIBLE = 4
const STATE_LEAVE = 5

const stateClassName = {
  [STATE_MEASURE]: th.PopCard_measureFrame, // should have the visible dimensions
  [STATE_FIT]: th.PopCard_measureFrame,
  [STATE_ENTER]: th.PopCard_enterFrame, // enter animation start
  [STATE_VISIBLE]: th.PopCard_visibleFrame, // enter animation ends, leave animation start
  [STATE_LEAVE]: th.PopCard_leaveFrame // leave animation ends
}

export default class PopCard extends Component {
  static propTypes = {
    originTarget: t.shape({
      getBoundingClientRect: t.func.isRequired
    }).isRequired,
    onClose: t.func,
    portalDidMount: t.func
  }

  targetBounds = {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }

  contentBounds = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  state = {
    renderState: STATE_MEASURE
  }

  close () {
    this.leave(() => this.props.onClose())
  }

  leave (cb) {
    const transitionDoneCb = () => {
      this.refs.pop.removeEventListener('transitionend', transitionDoneCb)
      cb()
    }
    this.refs.pop.addEventListener('transitionend', transitionDoneCb)

    this.setState({renderState: STATE_LEAVE})
  }

  readBounds () {
    this.targetBounds = this.props.originTarget.getBoundingClientRect()
    this.contentBounds = this.refs.pop.getBoundingClientRect()
  }

  globalKeyBind = null
  globalClickBind = null

  onPortalMount = () => {
    this.onStateMeasure()
    this.globalKeyUnbind = bindGlobalKeyOnce(27, () => { // ESC
      this.close()
    })
    this.globalClickUnbind = onClickOutsideOnce(this.refs.pop, () => {
      this.close()
    })
    this.props.portalDidMount()
  }

  componentWillUnmount () {
    this.globalKeyUnbind()
    this.globalClickUnbind()
  }

  onPortalUpdate = () => {
    switch (this.state.renderState) {
      case STATE_FIT: this.onStateFit(); break
      case STATE_ENTER: this.onStateEnter(); break
    }
  }

  onStateMeasure () {
    this.readBounds()
    this.setState({renderState: STATE_FIT})
  }

  onStateFit () {
    this.readBounds()
    this.setState({renderState: STATE_ENTER})
  }

  onStateEnter () {
    this.refs.pop.getBoundingClientRect() // Force repaint
    this.setState({renderState: STATE_VISIBLE})
  }

  // Do not try to refactor this, it's perfect as it is
  getPopStyle () {
    if (this.state.renderState === STATE_MEASURE) return {}

    const docWidth = document.documentElement.clientWidth
    const docHeight = document.documentElement.clientHeight

    const CB = this.contentBounds
    const TB = this.targetBounds

    let width = CB.width > docWidth ? docWidth : CB.width
    let height = CB.height > docHeight ? docHeight : CB.height

    let horizontal = {
      left: TB.left + TB.width / 2,
      marginLeft: -width / 2,
      width: width
    }

    let vertical = {
      top: TB.top + TB.height / 2,
      marginTop: -height / 2,
      height: height
    }

    let transformOrigin

    // Adjustements to fit it in the screen
    if (this.state.renderState > STATE_FIT) {
      if (CB.right > docWidth) {
        horizontal.marginLeft -= CB.right - docWidth
      } else if (CB.left < 0) {
        horizontal.marginLeft += -CB.left
      }

      if (CB.bottom > docHeight) {
        vertical.marginTop -= CB.bottom - docHeight
      } else if (CB.top < 0) {
        vertical.marginTop += -CB.top
      }

      transformOrigin = `${-horizontal.marginLeft}px ${-vertical.marginTop}px`
    }

    return {...horizontal, ...vertical, transformOrigin}
  }

  render () {
    let { children } = this.props
    let { renderState } = this.state

    let classNames = cx(th.PopCard, stateClassName[renderState])

    return (
      <Portal onMount={this.onPortalMount} onUpdate={this.onPortalUpdate}>
        <div className={classNames} style={this.getPopStyle()} ref='pop'>
          {children}
        </div>
      </Portal>
    )
  }
}
