import th from './Tooltip.sass'
import React, { PropTypes as t, Component } from 'react'
import Portal from './Portal'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cx from 'classnames'

const tooltipFactory = (ComposedComponent, defaultOptions = {}) => (
  class Tooltip extends Component {
    static propTypes = {
      position: t.oneOf(['top', 'left', 'right', 'bottom']),
      hideOnClick: t.bool,
      tooltip: t.string
    }

    static defaultProps = {
      hideOnClick: true,
      position: 'bottom',
      ...defaultOptions
    }

    state = {
      visible: false,
      firstTick: true,
      style: {}
    }

    onMouseEnter = (ev) => {
      if (this.props.tooltip) {
        let coords = ev.currentTarget.getBoundingClientRect()
        this.setState({
          visible: true,
          firstTick: true,
          style: this.getTopLeft(coords)
        })
      }
    }

    getTopLeft (c) {
      const docWidth = document.documentElement.clientWidth
      const docHeight = document.documentElement.clientHeight
      const midPointLeft = Math.floor(c.left + c.width / 2)
      const midPointTop = Math.floor(c.top + c.height / 2)

      switch (this.props.position) {
        case 'top': return {
          top: c.top,
          left: midPointLeft
        }
        case 'right': return {
          top: midPointTop,
          right: docWidth - c.right
        }
        case 'bottom': return {
          bottom: docHeight - c.bottom,
          left: midPointLeft
        }
        case 'left': return {
          top: midPointTop,
          left: c.left
        }
        default: throw new Error('Error no such position')
      }
    }

    onMouseLeave = (ev) => {
      if (this.props.tooltip) {
        this.setState({visible: false})
      }
    }

    onClick = (ev) => {
      if (this.state.visible && this.props.hideOnClick) {
        this.setState({visible: false})
      }
    }

    positionClass () {
      switch (this.props.position) {
        case 'top': return th.Tooltip_top
        case 'right': return th.Tooltip_right
        case 'bottom': return th.Tooltip_bottom
        case 'left': return th.Tooltip_left
        default: throw new Error('Error no such position')
      }
    }

    componentDidUpdate () {
      if (this.state.visible && this.state.firstTick === true) {
        setTimeout(() => this.setState({firstTick: false}), 5)
      }
    }

    render () {
      let {
        position, //eslint-disable-line no-unused-vars
        hideOnClick, //eslint-disable-line no-unused-vars
        tooltip,
        children,
        ...other
      } = this.props
      let { visible, firstTick, style } = this.state
      // <ReactCSSTransitionGroup
      //   transitionName='Tooltip'
      //   transitionAppear={true}
      //   transitionAppearTimeout={250}
      //   transitionLeaveTimeout={250}
      //   transitionEnterTimeout={250}>
      // </ReactCSSTransitionGroup>

      const className = cx(th.Tooltip, this.positionClass(), {
        [th.Tooltip_firstTick]: firstTick
      })

      return (
        <ComposedComponent
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
          {...other}>
          {children}
          { tooltip && visible ? (
            <Portal>
              <div className={className} style={style}>
                {tooltip}
              </div>
            </Portal>
          ) : null }
        </ComposedComponent>
      )
    }
  }
)

export const TTDiv = tooltipFactory('div', {position: 'top'})

export default tooltipFactory
