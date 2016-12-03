import React, { PropTypes as t, Component } from 'react'
import { tooltipFactory } from 'react-toolbox/lib/tooltip'
import Ripple from 'react-toolbox/lib/ripple'
import Toggle from './Toggle'

const TooltippedToggle = tooltipFactory({position: 'bottom'})(Toggle)

class TooltipRippledToggle extends Component {
  static propTypes = {
    active: t.bool.isRequired,
    onToggle: t.func.isRequired,
    title: t.string.isRequired,
    name: t.string.isRequired
  }

  render () {
    return (
      <TooltippedToggle tooltip={this.props.title} {...this.props}/>
    )
  }
}

export default Ripple()(TooltipRippledToggle)