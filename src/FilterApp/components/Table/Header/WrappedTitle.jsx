import React, { PropTypes as t, Component } from 'react'
import { tooltipFactory } from 'react-toolbox/lib/tooltip'
import Ripple from 'shared/components/Ripple'
import Title from './Title'

const TooltippedTitle = tooltipFactory({position: 'top'})(Title)
const SortableTooltippedTitle = Ripple()(TooltippedTitle)

export default class WrappedTitle extends Component {
  static propTypes = {
    filter: t.shape({
      title: t.string.isRequired,
      sort: t.oneOfType([t.string, t.bool])
    })
  }

  render () {
    let sortable = !!this.props.filter.sort
    let Comp = sortable ? SortableTooltippedTitle : TooltippedTitle
    return <Comp tooltip={this.props.filter.title} {...this.props}/>
  }
}
