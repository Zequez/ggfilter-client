import React, { PropTypes as t, Component } from 'react'
import Ripple from 'shared/components/Ripple'
import myTooltipFactory from 'shared/components/Tooltip'
import Toggle from './Toggle'

const TooltippedToggle = Ripple()(myTooltipFactory(Toggle))

export default class TooltipRippledToggle extends Component {
  static propTypes = {
    active: t.bool.isRequired,
    onToggle: t.func.isRequired,
    title: t.string.isRequired,
    name: t.string.isRequired
  }

  render () {
    return (
      <TooltippedToggle
        rippleDisabled={this.props.active}
        tooltip={this.props.title} {...this.props}/>
    )
  }
}
