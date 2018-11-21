import React from 'react'
import { connect } from 'react-redux'
import { createRouteNodeSelector, actions } from 'redux-router5'
import { paths } from 'src/app/router'

export class Link extends React.Component {
  // static propTypes = {
  //   to: React.PropTypes.string.isRequired,
  //   children: React.PropTypes.node.isRequired,
  //   className: React.PropTypes.string,
  //   navigateTo: React.PropTypes.func.isRequired,
  //   target: React.PropTypes.string
  // }

  onClick = (ev) => {
    if (!this.isRaw()) {
      ev.preventDefault()
      this.props.navigateTo(this.props.to)
    }
  }

  isRaw = () => !!this.props.to.match(/^https?:\/\//)

  render () {
    let { to, children, className, target } = this.props

    return (
      <a
        href={this.isRaw() ? to : paths(to)}
        onClick={this.onClick}
        className={className}
        target={target}>
        {children}
      </a>
    )
  }
}

export default connect((s) => ({
  ...createRouteNodeSelector('')(s)
}), {
  navigateTo: actions.navigateTo
})(Link)
