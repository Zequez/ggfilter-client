import React, { PropTypes as t, Component } from 'react'
import tooltipFactory from 'shared/components/Tooltip'
import Ripple from 'shared/components/Ripple'
import Title from './Title'

const TooltippedTitle = tooltipFactory(Title, {position: 'top'})
const SortableTooltippedTitle = Ripple()(TooltippedTitle)

export default class WrappedTitle extends Component {
  static propTypes = {
    filter: t.shape({
      title: t.string.isRequired,
      sort: t.oneOfType([t.string, t.bool])
    })
  }

  render () {
    let { title, longTitle, sort } = this.props.filter
    let sortable = !!sort
    let Comp = sortable ? SortableTooltippedTitle : TooltippedTitle
    return <Comp tooltip={longTitle || title} {...this.props}/>
  }
}
