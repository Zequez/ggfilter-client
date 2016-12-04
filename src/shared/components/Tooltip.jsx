import th from './Tooltip.sass'
import React, { PropTypes as t, Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cx from 'classnames'

const tooltipFactory = (ComposedComponent) => (
  class Tooltip extends Component {
    static propTypes = {
      position: t.oneOf(['top', 'left', 'right', 'bottom']),
      hideOnClick: t.bool,
      tooltip: t.string
    }

    static defaultProps = {
      hideOnClick: true,
      position: 'bottom'
    }

    state = {
      visible: false,
      top: 0,
      left: 0
    }

    onMouseEnter = (ev) => {
      if (this.props.tooltip) {
        let coords = ev.currentTarget.getBoundingClientRect()
        this.setState({
          visible: true,
          ...this.getTopLeft(coords)
        })
      }
    }

    getTopLeft (c) {
      switch (this.props.position) {
        case 'top': return { top: c.top, left: Math.floor(c.left + c.width / 2) }
        case 'right': return { top: Math.floor(c.top + c.height / 2), left: c.left + c.width }
        case 'bottom': return { top: c.top + c.height, left: Math.floor(c.left + c.width / 2) }
        case 'left': return { top: Math.floor(c.top + c.height / 2), left: c.left }
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

    render () {
      let {
        position, //eslint-disable-line no-unused-vars
        hideOnClick, //eslint-disable-line no-unused-vars
        tooltip,
        children,
        ...other
      } = this.props
      let { visible, top, left } = this.state

      let style = { top, left }
      // <ReactCSSTransitionGroup
      //   transitionName='Tooltip'
      //   transitionAppear={true}
      //   transitionAppearTimeout={250}
      //   transitionLeaveTimeout={250}
      //   transitionEnterTimeout={250}>
      // </ReactCSSTransitionGroup>

      const className = cx(th.Tooltip, this.positionClass(), {
        // [th.Tooltip_visible]: visible
      })

      return (
        <ComposedComponent
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
          {...other}>
          {children}
          { tooltip && visible ? (
            <div className={className} style={style}>
              {tooltip}
            </div>
          ) : null }
        </ComposedComponent>
      )
    }
  }
)

export default tooltipFactory
